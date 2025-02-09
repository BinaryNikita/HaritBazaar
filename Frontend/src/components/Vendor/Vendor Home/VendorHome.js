import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'; // Optional for loading state
import { api } from '../../../axios'; 
import Footer from '../../FrontPage/Footer'
import Header from "../../FrontPage/Header/Header";
import './VendorHome.css'

function VendorHome(){
    const navigate = useNavigate();
    return (
        <>
            <Header/>
            <MostSelledProducts/>
            <Footer/>
        </>
    );
}

const MostSelledProducts = () => {
  const [products, setProducts] = useState([]);
  const [mostSelled, setMostSelled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/vendor-products',{headers: {Authorization: localStorage.getItem('token')}});
      console.log(response.data);
      if (Array.isArray(response.data.product)) {
        const allProducts = response.data.product;

        // Get top 4 products sorted by buyCount
        const topProducts = [...allProducts]
          .sort((a, b) => b.buyCount - a.buyCount) 
          .slice(0, 4); // Get the top 4 products

        setMostSelled(topProducts);
      } else {
        console.error('Invalid products format:', response.data.products);
        setProducts([]);
        setMostSelled([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(()=>{},[mostSelled]);

  // Retry fetching products in case of an error
  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  if (loading)
    return (
      <div className="spinner-container text-center">
        <Spinner animation="border" /> Loading most wanted products...
      </div>
    );

  if (error)
    return (
      <div className="text-center">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={retryFetch}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="m-w-p text-center p-2">
      <button onClick={()=>navigate('/add-product-by-file')} className="w-100 btn btn-outline-info">Add Product By Excel</button>
      <h2 className='text-success fw-bold mb-2'>Your Most Selled Products</h2>
      <div className="row d-flex justify-content-center">
        {mostSelled.length > 0 ? (
          mostSelled.map((product) => (
            <div key={product._id} className="card m-2 col-lg-3 col-md-3" style={{ width: '18rem' }}>
              <img
                src={product.image[0]}
                className="card-img-top rounded mt-2"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Rs. {(product.price-((product.price*product.discount)/100)).toFixed(2)}</p>
                <p className="card-text">Buy Count: {product.buyCount}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No most wanted products available.</p>
        )}
      </div>
    </div>
  );
};

export default VendorHome;
