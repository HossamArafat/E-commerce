import { faCartShopping, faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Modal, Nav, Navbar, NavLink } from "react-bootstrap";
import { Cart } from "../../Context/CartContext";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  // States
  const [show, setShow] = useState(false);
  const [productsCart, setProductsCart] = useState([])
  const [totalInfo, setTotalInfo] = useState({})
  const {isChange} = useContext(Cart)

  useEffect(()=> {
    setProductsCart(JSON.parse(localStorage.getItem("product-cart")) || [])
  }, [isChange])

  useEffect(()=> {
    let count = 0
    let discount = 0
    productsCart?.map((item)=> {
      count += item.count
      discount += (item.count * Number(item.discount))  
    })
    setTotalInfo({count, discount})
  }, [productsCart])

  // Handle functions
  const handleToggle = () => setShow((prev)=> !prev);
  const handleEdit = (id) => window.location.pathname = `/product/${id}`
  const handleDelete = (id) => {
    const filterProducts = productsCart.filter((item)=> item.id !== id)
    localStorage.setItem("product-cart", JSON.stringify(filterProducts))
    setProductsCart(filterProducts)
  }

  // Mapping
  const productsShow = productsCart.map((item, index)=> 
    <div key={index} className="d-flex align-items-start gap-2 flex-wrap mx-4 mx-sm-0 border-bottom border-1 border-gray mb-3">        
      <img
        src={item.images[0].image}
        height={100}
        style={{minWidth: "150px", objectFit: "cover"}}
        className="col-12 col-sm-5"
        alt="img"
      />
      <div className="col-12 col-sm-6">
        <h6>{item.title}</h6>
        <p className="m-0 text-truncate">{item.description}</p>
        <p className="m-0 ">Quantity: {item.count}</p>
        <div className="d-flex align-items-center gap-3 justify-content-between align-items-start">
            <span className="h4 fw-bold" style={{ color: "#667eea" }}>
              ${item.discount}
            </span>
            <span>
              <FontAwesomeIcon onClick={()=> handleDelete(item.id)} icon={faTrashAlt} className="text-danger fs-5 me-1"/>
              <FontAwesomeIcon onClick={()=> handleEdit(item.id)} icon={faPenToSquare} className="text-primary fs-5"/>
            </span>
        </div>
      </div>
    </div>
  )

  return (
    <Navbar expand="lg"
      className="bg-body-tertiary sticky-top"
      style={{
        boxShadow: "2px 1px 6px 0px rgb(0 0 0 / 10%)"
      }}
    >
      <Container
        className="py-1 px-0"
      >
        <Navbar.Brand 
          href="#home"
          className="fw-bold fs-2 me-1 pt-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <FontAwesomeIcon className="me-2 text-primary" icon={faShoppingBag}></FontAwesomeIcon>
          <span>

          E-commerce
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="pb-3 pb-lg-0">
          <Nav className="me-auto">
            <NavLink className="nav-link fw-semibold nav-link-hover" href="/#">Home</NavLink>
            <NavLink className="nav-link fw-semibold nav-link-hover" href="/#categories">Collections</NavLink>
            <NavLink className="nav-link fw-semibold nav-link-hover" href="/#products" >Products</NavLink>
            <NavLink className="nav-link fw-semibold nav-link-hover d-none d-xl-block" href="#footer" >Contacts</NavLink>
          </Nav>
          <div
            className="input-group me-lg-3 me-0 mb-lg-0 mb-4 search-container"
            style={{ width: window.innerWidth > 991 ? "256px" : "100%" }}
          >
            <button
              className="btn btn-primary search-btn"
              type="button"
              style={{
                borderRadius: "25px 0 0 25px",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
              }}
            >
              <FontAwesomeIcon icon={faSearch}/>
            </button>
            <input
              type="text"
              className="form-control border-0 shadow-sm search-input"
              placeholder="Search products..."
              style={{
                borderRadius: "0 25px 25px 0 ",
                backgroundColor: "#f8f9fa",
              }}
            />
          </div> 
          <div className="d-flex gap-2 justify-content-between">
            <div className="d-flex gap-3">
              <div className="card p-2 my-button" style={{cursor: 'pointer'}} onClick={handleToggle}>
                <FontAwesomeIcon
                  style={{ fontSize: "20px" }}
                  className="cart"
                  icon={faCartShopping}
                />
              </div>
              <Modal show={show} onHide={handleToggle}>
                <Modal.Header closeButton>
                  <Modal.Title> Shopping Cart </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {productsShow}
                  <div className="d-flex justify-content-around">
                    <span className="fw-bold">
                      Total Quantity: {totalInfo.count}
                    </span>
                    <span className="fw-bold">
                      Total Price: ${totalInfo.discount}
                    </span>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleToggle}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleToggle}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <a
                href="/#"
                className="text-decoration-none text-dark position-relative icon-hover"
              >
                <i className="fas fa-heart fs-5 text-danger"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger pulse-animation">
                  {totalInfo?.count > 0 && totalInfo?.count}
                </span>
              </a>
              <a
                href="/#"
                className="text-decoration-none text-dark icon-hover"
              >
                <i className="fas fa-user-circle fs-5 text-success"></i>
              </a>
            </div>
            <div className="d-flex gap-2 justify-content-end justify-content-lg-start">
              <a
                href="/login"
                className="btn btn-outline-primary text-decoration-none"
              >
                Login
              </a>
              <a
                href="/register"
                className="btn btn-outline-primary text-decoration-none"
              >
                Signup
              </a>
            </div>
          </div>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
