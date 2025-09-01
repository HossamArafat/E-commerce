import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../../Components/pagination/paginate";
import { useEffect, useState } from "react";
import { customAxios } from "../../API/CustomAxios";
import TransformDate from "../../Helpers/TransformDate";
import '../../CSS/components/table.css'

export default function SharedTable({ header, data, metadata }) {
  // States
  const [search, setSearch] = useState('');
  const [dataSearched, setDataSearched] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false)
  const [date, setDate] = useState("");

  const dataFilteredByDate = data.filter((item) => TransformDate(item.created_at) === date)
  const dataSearchedByDate = dataSearched.filter((item) => TransformDate(item.created_at) === date)
  const dataType = date.length === 0 ? (search.length > 0 ? dataSearched : data) : (search.length > 0 ? dataSearchedByDate : dataFilteredByDate)

  // Handle functions
  function handleSearch(e) {
    setSearch(e.target.value)
    setSearchLoading(true)
  }

  function handleDate(e) {
    setDate(e.target.value)
  }

  async function getSearchedData() {
    try{
      const res = await customAxios.post(`${metadata.link}/search?title=${search}`)
      setDataSearched(res.data)
      setSearchLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false)
    }, 500);
    return () => clearTimeout(debounce);
  }, [search])

  // Mapping
  const headerShow = header.name.map((item, index) => (
    <th className="bg-dark text-white" key={index}>{item}</th>
  ));

  const dataShow = dataType.map((element, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {header.key.map((item, key) => (
        <td key={key}>
          {element[item] === "1995" ? (
            "Admin"
          ) : element[item] === "1999" ? (
            "Product Manager"
          ) : element[item] === "2001" ? (
            "User"
          ) : item === "image" ? (
            <img src={element[item]} alt="category" style={{ width: "60px", height:"40px" }} />
          ) : item === "images" ? <div style={{height: '190px', overflowY: element[item].length > 4 ? 'scroll' : 'hidden', scrollbarColor: '#284f64 #f2f3fe'}}> {element[item].map((images, i) => <img key={i} src={images.image} width={'70px'} style={{marginRight: '4px', marginBottom: '1px'}} alt="product"/>)} </div>
          : item === "created_at" || item === "updated_at" ? (<div style={{width: '88px'}}>{TransformDate(element[item])}</div>
          ) : (
            element[item]
          )
          }
          {metadata.currUser &&
            element[item] === metadata.currUser.name &&
            " (You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${element.id}`}>
            <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            fontSize={"19px"}
            cursor={"pointer"}
            color={
              metadata.name === "Users"
                ? metadata.currUser.id !== element.id
                  ? "red"
                  : "gray"
                : "red"
            }
            onClick={() => metadata.delete(element.id)}
            icon={faTrash}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="d-flex gap-1 mb-3">
        <div className="col-5">
          <Form.Control
            type="search"
            placeholder="Search..."
            onChange={handleSearch}
          >
          </Form.Control>
        </div>
        <div style={{width: date.length === 0 ? '45px' : '130px'}}>
          <Form.Control
            type="date"
            onChange={handleDate}
          >
          </Form.Control>
        </div>
      </div>
      <Table striped responsive bordered hover>
        <thead>
          <tr>
            <th className="bg-dark text-white">Id</th>
            {headerShow}
            <th className="bg-dark text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {!metadata.loaded || searchLoading || (search.length !== 0 && dataSearched.length === 0)? (
            <tr>
              <td colSpan={12} style={{ textAlign: "center" }}>
               {  
                  !metadata.loaded ? 
                  'Loading...' :
                  searchLoading ?
                  'Searching...' : 'No Results'
               }
              </td>
            </tr>
          ) : data.length === 0 ? (
            
            <tr>
              <td colSpan={12} style={{ textAlign: "center" }}>
                Not Found {metadata.name}
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      {
        (metadata.total > 3) && (
          <div className="d-flex align-items-center justify-content-center my-4 gap-3 flex-column flex-lg-row">
            <div className="col-3 d-flex">
              <div style={{textWrap: "nowrap", lineHeight: '35px'}} className="w-5 me-1">
                Items Per Page:
              </div>
              <div className="w-50">
                <Form.Select className="w-auto" value={metadata.limit} onChange={(e) => metadata.setLimit(e.target.value)}>
                  <option value={'3'}>3</option>
                  <option value={'5'}>5</option>
                  <option value={'10'}>10</option>
                  <option value={'15'}>15</option>
                </Form.Select>
              </div>
            </div>
            <div>
              {/* <PaginatedItems data={data} itemsPerPage={metadata.limit} setPage={metadata.setPage}></PaginatedItems> // commented out for all data from backend ans paginatation is handled by frontend */}
              <PaginatedItems total={metadata.total} perPage={metadata.perPage} setPage={metadata.setPage}></PaginatedItems>
            </div>
          </div>
        )
      }
    </>
  );
}
