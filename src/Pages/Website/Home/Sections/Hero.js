import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const nav = useNavigate()
  return (
    <section className="hero-section position-relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      minHeight: '85vh'
    }}>
      <div className="hero-particles position-absolute w-100 h-100"></div>
      <div className="hero-overlay position-absolute w-100 h-100" style={{background: 'rgba(0,0,0,0.1)'}}></div>
      <div className="container h-100">
        <div className="row align-items-center h-100 py-5 position-relative" style={{zIndex: 2}}>
          <div className="col-lg-6 hero-content">
            <div className="text-white animate-fade-in-up">
              <h1 className="display-4 fw-bold mb-4 hero-title" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                Discover <span className="text-warning">E-commerce</span><br/>
                at Your Fingertips
              </h1>
              <p className="lead mb-4 fs-5" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}}>
                Experience premium shopping with curated collections, exclusive deals, 
                and lightning-fast delivery. Your dream products await.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-warning btn-lg px-5 py-3 fw-bold text-dark shadow-lg btn-hover-lift" style={{borderRadius: '50px'}}
                onClick={()=>nav('allcategories')}
                >
                  Explore All Collections
                </button>
                <button className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-lg btn-hover-lift" style={{borderRadius: '50px'}}
                onClick={()=>nav('login')}
                >
                  Join Us
                </button>
              </div>
              
              <div className="row mt-5 stats-container">
                <div className="col-4">
                  <div className="text-center stats-item">
                    <h3 className="fw-bold display-6 mb-1 counter-animation">50K+</h3>
                    <small className="text-light">Happy Customers</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center stats-item">
                    <h3 className="fw-bold display-6 mb-1 counter-animation">100K+</h3>
                    <small className="text-light">Premium Products</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center stats-item">
                    <h3 className="fw-bold display-6 mb-1 counter-animation">99.9%</h3>
                    <small className="text-light">Satisfaction Rate</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 hero-image">
            <div className="position-relative animate-float">
              <img 
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Shopping" 
                className="img-fluid rounded-4 shadow-2xl hero-main-image"
                style={{
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)'
                }}
              />
              <div className="position-absolute top-0 end-0 m-4 animate-pulse-slow">
                <div className="bg-gradient-danger text-white px-4 py-3 rounded-4 shadow-lg" style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                  transform: 'rotate(3deg)'
                }}>
                  <div className="fw-bold fs-5">70% OFF</div>
                  <small>Limited Time</small>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 m-4">
                <div className="bg-white bg-opacity-90 backdrop-blur px-4 py-3 rounded-4 shadow-lg">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                        <FontAwesomeIcon className='text-white' icon={faShippingFast}/>
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold text-dark">Free Shipping</div>
                      <small className="text-muted">On orders over $99</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;