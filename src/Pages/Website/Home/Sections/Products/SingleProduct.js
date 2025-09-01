import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { customAxios } from "../../../../../API/CustomAxios";
import { CART, Prod } from "../../../../../API/Api";
import { useParams } from "react-router-dom";
import RenderStars from "../../../../../Helpers/RenderStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Skeleton from "react-loading-skeleton";
import PlusMinusBtn from "../../../../../Components/Button/PlusMinusBtn";
import { toast, ToastContainer } from "react-toastify";
import { Cart } from "../../../../../Context/CartContext";

function SingleProduct() {
  // States
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const {setIsChange} = useContext(Cart)

  useEffect(() => {
    setLoading(true)
    customAxios.get(`${Prod}/${id}`).then((res) => {
      setProductImages(
        res.data[0].images.map((img) => {
          return {
            original: img.image,
            thumbnail: img.image,
          };
        })
      );
      setProduct(res.data[0])
      setLoading(false)
    });
  }, []);

  // Handle functions
  function getSkeletonStyle(h, m) {
   const w = window.innerWidth > 992 ? '35vw': window.innerWidth > 768 ? '66vw' : window.innerWidth > 575 ? '70vh' : '85vw'
    return {
      borderRadius: '10px',
      height: h,
      width: w,
      minWidth: '296px',
      marginBottom: m
    }
  }

  function checkAvailableInfo(stock) {
    if(stock < 4) {
      return (
        stock === 0 ?  "This product is unavailable"
        :stock === 1 ?  "There is only 1 left"
        :`There are only ${stock} left`
    )} 
  }

  async function handleOrder() {
    if(count === 0) {
      toast("Please, enter the quantity that can be purchased!")
    } else {
      const getItems = JSON.parse(localStorage.getItem("product-cart")) || [];
      const findPoduct = getItems.find((item)=> item.id === Number(id))
      let firstCount = 0
      
      if(findPoduct) { 
          findPoduct.count += count 
      } else {
        getItems.push({...product, count: count})
        firstCount = count
      }
      
      try{
          await customAxios.post(`${CART}/check`, { 
            product_id: product.id,
            count: findPoduct?.count || firstCount}).then((res)=> {
              localStorage.setItem("product-cart", JSON.stringify(getItems));
              setIsChange((prev)=> !prev)
          })
        } catch(err) {
          toast(err.response.data.error)
        }
    }
  }

  return (
    <Container className="mt-5 d-flex justify-content-center justify-content-lg-start flex-wrap gap-5">
      {loading ? 
        <Skeleton  style={getSkeletonStyle('50vh', '30px')} className='col-lg-5 col-12'/>
        :<div className="col-lg-5 col-12">
          <ImageGallery items={productImages} />;
        </div>
      }
      {loading ? 
        <div style={{marginBottom: '30px', border: 'none'}} className="card">
          <div className="card-body">
            <Skeleton count={4} style={getSkeletonStyle('7vh', '15px')} className='col-lg-4 col-12'/>
          </div>
        </div>
        :<div className="col-lg-5 col-12">
          <div className="card" style={{border: 'none'}}>
            <div className="card-body">
              <h5 className="card-title h2">{product.title}</h5>
              <p className="card-text"> <small className="text-muted">{product.About}</small> </p>
              <p className="card-text fs-5">{product.description}</p>
                <small className="text-danger"> 
                  {
                    checkAvailableInfo(product.stock)
                  }
                </small>
              <div className="d-flex align-items-center mb-2">
                <div className="me-2">{RenderStars(product.rating)}</div>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top border-secondary flex-wrap py-3 gap-4">
                <div>
                  <span className="h4 fw-bold" style={{ color: "#667eea" }}>
                    ${product.discount}
                  </span>
                  <span className="text-muted text-decoration-line-through ms-2 fs-6">
                    ${product.price}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2">
                <PlusMinusBtn setCount={(item)=> setCount(item)}/>
                <div className="btn btn-primary" style={{minWidth: '135px'}} onClick={handleOrder}>
                    <span className="me-1">
                      Add to Cart
                    </span>
                    <FontAwesomeIcon style={{fontSize: '20px'}} className="" icon={faCartShopping} />
                </div>
                <ToastContainer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Container>
  );
}
export default SingleProduct;
