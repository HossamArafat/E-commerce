import { PROD, Prod } from "../../../API/Api";
import { useEffect, useState } from "react";
import { customAxios } from "../../../API/CustomAxios";
import { Link } from "react-router-dom";
import SharedTable from "../../../Components/Dasboard/SharedTable";

function Products() {
  // States
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0)
  // Constants
  const header = {
    name: [
      "Images",
      "Title",
      "Description",
      "Price",
      "Discount",
      "About",
      "Rating",
      "Stock",
      "Created",
      "Updated"
    ],
    key: [
      "images",
      "title",
      "description",
      "price",
      "discount",
      "About",
      "rating",
      "stock",
      "created_at",
      "updated_at"
    ],
  };
  const metadata = {
    name: "Products",
    link: Prod,
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
  };

  // Get All Products
  useEffect(() => {
    setLoaded(false)
    customAxios
      .get(`/${PROD}?limit=${limit}&page=${page}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.total);
        setPerPage(res.data.per_page)
        setLoaded(true)
      })
      .catch((err) => console.log(err));
  }, [change, page, limit]);

  // Handle functions
  async function handleDelete(id) {
    try {
      await customAxios.delete(`${Prod}/${id}`);
      setChange((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="bg-white w-100 custom-box-shadow">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h1>Products Page</h1>
          <Link className="btn btn-primary" to={"/dashboard/product/add"}>
            Add Product
          </Link>
        </div>
        <SharedTable header={header} data={products} metadata={metadata} />
      </div>
    </>
  );
}

export default Products;
