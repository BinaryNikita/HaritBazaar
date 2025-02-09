import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { api } from '../../../axios';
import './MostWanted.css';
import Card from './Card';

const MostWantedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [mostWanted, setMostWanted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/all-products');

      if (Array.isArray(response.data.products)) {
        const allProducts = response.data.products;
        setProducts(allProducts);

        const topProducts = [...allProducts]
          .sort((a, b) => b.viewCount - a.viewCount)
          .slice(0, 8);

        setMostWanted(topProducts);
      } else {
        console.error('Invalid products format:', response.data.products);
        setProducts([]);
        setMostWanted([]);
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

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  if (loading)
    return (
      <div className="spinner-container">
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
    <div className="text-center">
      <h2 className='text-success mw-title fw-bold mb-2'>Most Wanted Products</h2>
      <div className="scroll-container-m-w green p-3">
        {mostWanted.length > 0 ? (
          mostWanted.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <p>No most wanted products available.</p>
        )}
      </div>
    </div>
  );
};

export default MostWantedProducts;