import { faFacebookF, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faClock, faEnvelope, faMapMarkerAlt, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer id='footer' className="bg-dark text-light py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 ps-0">
            <div className="mb-4">
              <h4 className="fw-bold text-primary mb-3">
                <FontAwesomeIcon className="me-2" icon={faShoppingBag}/>
                E-commerce
              </h4>
              <p className="text-muted">
                Your one-stop destination for quality products at unbeatable prices. 
                We're committed to providing exceptional shopping experience with 
                fast shipping and excellent customer service.
              </p>
              <div className="d-flex gap-3">
                <a href="/#" className="text-light">
                  <FontAwesomeIcon className="fs-5" icon={faFacebookF}/>
                </a>
                <a href="/#" className="text-light">
                  <FontAwesomeIcon className="fs-5" icon={faXTwitter}/>
                </a>
                <a href="/#" className="text-light">
                  <FontAwesomeIcon className="fs-5" icon={faInstagram}/>
                </a>
                <a href="/#" className="text-light">
                  <FontAwesomeIcon className="fs-5" icon={faYoutube}/>
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-1 col-md-6 px-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/#products" className="text-muted text-decoration-none">Products</a>
              </li>
              <li className="mb-2">
                <a href="/#categories" className="text-muted text-decoration-none">Categories</a>
              </li>
              <li className="mb-2">
                <a href="#footer" className="text-muted text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Track Order</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Returns</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Shipping Info</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Size Guide</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 px-0">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Cookie Policy</a>
              </li>
              <li className="mb-2">
                <a href="/#" className="text-muted text-decoration-none">Refund Policy</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Contact Info</h6>
            <div className="text-muted">
              <p className="mb-2">
                <FontAwesomeIcon className="me-2" icon={faMapMarkerAlt}/>
                123 Shopping St, NY 10001
              </p>
              <p className="mb-2">
                <FontAwesomeIcon className="me-2" icon={faPhone}/>
                +1 (555) 123-4567
              </p>
              <p className="mb-2">
                <FontAwesomeIcon className="me-2" icon={faEnvelope}/>
                support@ecommerce.com
              </p>
              <p className="mb-0">
                <FontAwesomeIcon className="me-2" icon={faClock}/>
                Mon-Fri: 9AM-6PM
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2025 E-commerce. All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end gap-3">
              Hossam Arafat ❤️
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;