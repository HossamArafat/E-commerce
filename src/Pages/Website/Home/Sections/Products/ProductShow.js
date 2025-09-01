import { faEye, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import RenderStars from "../../../../../Helpers/RenderStars"

function ProductShow({products}) {
  // Mapping
  const productShow = products.map((product, index) => (
     <NavLink to={`/product/${product.id}`} key={index} className="col-lg-4 col-md-6">
          <div
            className="card h-100 border-0 shadow-lg product-card"
            style={{ borderRadius: "20px" }}
          >
            <div className="position-relative overflow-hidden">
              <img
                src={product.images[0].image}
                alt={product.title}
                className="card-img-top"
                style={{
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "20px 20px 0 0",
                }}
              />
              <div className="position-absolute top-0 end-0 m-3">
                <span
                  className={`badge ${product.badgeColor} px-3 py-2 fw-bold shadow-sm`}
                  style={{ borderRadius: "15px", fontSize: "0.8rem" }}
                >
                  {product.badge}
                </span>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 p-4 product-overlay">
                <button
                  className="btn btn-white w-100 fw-bold shadow-lg"
                  style={{
                    borderRadius: "15px",
                    color: "#667eea",
                    border: "1px solid rgb(102, 126, 234)",
                  }}
                >
                  <FontAwesomeIcon className="me-2" icon={faShoppingCart}/>
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="card-body p-4">
              <h5 className="card-title fw-bold fs-5 mb-3">{product.title}</h5>
              <p className="card-text" style={{height: '75px'}}>
                {product.description}
              </p>
              <div className="d-flex align-items-center mb-2">
                <div className="me-2">{RenderStars(product.rating)}</div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="h4 fw-bold" style={{ color: "#667eea" }}>
                    ${product.discount}
                  </span>
                  <span className="text-muted text-decoration-line-through ms-2 fs-6">
                    ${product.price}
                  </span>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm rounded-circle quick-view-btn"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          </div>
        </NavLink>))

    return (
        productShow
    )
}
export default ProductShow