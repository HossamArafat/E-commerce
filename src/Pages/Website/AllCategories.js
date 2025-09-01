import { useEffect, useState } from 'react';
import { customAxios } from '../../../src/API/CustomAxios';
import { CAT } from '../../API/Api';
import LoadingSubmit from '../../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const AllCategories = () => {
  // States
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  useEffect(() => {
    setLoading(true)
    customAxios.get(`${CAT}`)
    .then((res) => {
        setCategories(res.data)
        setLoading(false)
    })
  }, [])
  
  return (
    <section className="py-5" style={{background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)'}}>
    {
    // loading
     false
     && <LoadingSubmit />}
      <div className="container">
        <div className="text-center mb-5 animate-fade-in-up">
          <h2 className="display-4 fw-bold mb-3" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            All Collections
          </h2>
          <p className="lead text-muted fs-5">Discover products across our exclusive categories</p>
        </div>
         {loading ? 
          <Skeleton count={18} height={500} borderRadius={30} className='col-lg-3 col-md-5 my-skeleton' containerClassName="row g-4 gap-4 justify-content-center"/>
          : <div className="row g-4">
          {categories.map(category => (
            <div key={category.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-lg category-card" style={{borderRadius: '20px'}}>
                <div className="position-relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="card-img-top"
                    style={{height: '250px', objectFit: 'cover', borderRadius: '20px 20px 0 0'}}
                  />
                </div>
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold fs-4 mb-2">{category.title}</h5>
                  <button className="btn btn-outline-primary btn-sm px-4 py-2 fw-semibold" style={{borderRadius: '25px', borderWidth: '2px'}}
                  onClick={()=> nav('/login')}
                  >
                    Explore <FontAwesomeIcon className="ms-2" icon={faArrowRight}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      </div>
    </section>
  );
};

export default AllCategories;