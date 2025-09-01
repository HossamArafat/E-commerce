import { Cat, CAT } from "../../../API/Api";
import { useEffect, useState } from "react";
import { customAxios } from "../../../API/CustomAxios";
import { Link } from "react-router-dom";
import SharedTable from "../../../Components/Dasboard/SharedTable";


function Categories() {
  // States
  const [categories, setCategories] = useState([]);
  const [change, setChange] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);  //change the number of page
  const [limit, setLimit] = useState(5); //change the limit of items for each page

  const [total, setTotal] = useState(0); // For the pagination of backend
  const [perPage, setPerPage] = useState(0); // For the pagination of backend

  // Constants
  const header = {
    name: ["Title", "Image", "Created", "Updated"],
    key: ["title", "image", "created_at", "updated_at"],
  };
   const metadata = {
          name: "Categories",
          link: Cat,
          loaded: loaded,
          currUser: null,
          delete: handleDelete,
          limit: limit,
          setLimit: setLimit,
          page: page,
          setPage: setPage,
          total: total,
          perPage: perPage,
          search: 'title'
    }

  // Get All Categories
  useEffect(() => {
    setLoaded(false)
    customAxios
      .get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((res) => {
        setCategories(res.data.data);
        setTotal(res.data.total);
        setPerPage(res.data.per_page)
        setLoaded(true)
      })
      .catch((err) => console.log(err));
  }, [change, page, limit]);
  
  // Handle functions
  async function handleDelete(id) {
    try {
      await customAxios.delete(`${Cat}/${id}`);
      setChange((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white w-100 custom-box-shadow">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1>Categories Page</h1>
          <Link className="btn btn-primary" to={"/dashboard/category/add"}>
            Add Category
          </Link>
        </div>
        <SharedTable header={header} data={categories} metadata={metadata}/>
      </div>
    </>
  );
}

export default Categories;
