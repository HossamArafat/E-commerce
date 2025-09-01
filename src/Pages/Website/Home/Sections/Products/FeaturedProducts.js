
import React, { useEffect, useState } from "react";
import { customAxios } from "../../../../../API/CustomAxios";
import { Latest, TopRated } from "../../../../../API/Api";
import Skeleton from "react-loading-skeleton";
import ProductShow from "./ProductShow";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeaturedProducts = () => {
  // States
  const [latestProduct, setLatestProduct] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false)
  const updatedlatest = latestProduct.map(item => ({
    ...item, 
    badge: "Latest Products",         
    badgeColor: "bg-warning text-dark",    
  }));
  const updatedTopRated = topRated.map(item => ({
      ...item, 
      badge: "Top Rated",         
      badgeColor: "bg-primary",    
  }));

  useEffect(() => {
    setLoading(true)
    customAxios
      .get(`${Latest}`)
      .then((res) => {
        setLatestProduct(res.data)
        setLoading(false)
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    customAxios
      .get(`${TopRated}`)
      .then((res) => {
        setTopRated(res.data)
        setLoading(false)
      });
  }, []);

  return (
    <section
      id="products"
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-5 animate-fade-in-up">
          <div className="mb-3">
            <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-semibold">
              ⭐ FEATURED
            </span>
          </div>
          <h2
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Premium Selection
          </h2>
          <p className="lead text-muted fs-5">
            Handpicked products that define luxury and quality
          </p>
        </div>

         {loading ? 
            <Skeleton count={6} height={500} borderRadius={30} className='col-lg-3 col-md-5 my-skeleton' containerClassName="row gap-3 justify-content-center"/>
            : <div className="row g-4"> 
                <ProductShow products={updatedTopRated}/>
                <ProductShow products={updatedlatest}/>
              </div>
         }
        <div className="text-center mt-5">
          <button
            className="btn btn-lg px-5 py-3 fw-bold shadow-lg btn-hover-lift"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "50px",
              color: "white",
            }}
          >
            Explore All Products <FontAwesomeIcon className="ms-2" icon={faArrowRight}/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
