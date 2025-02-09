import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { api } from "../../../axios";
import { Spinner } from "react-bootstrap";

function MostDiscountedProducts(){
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/all-products');
  
        if (Array.isArray(response.data.products)) {
          const allProducts = response.data.products;
  
          const topProducts = allProducts.sort((a, b) => b.discount - a.discount).slice(0, 8);
  
          setProducts([...topProducts])
        } else {
          console.error('Invalid products format:', response.data.products);
          setProducts([]);
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
  
    return <>
      <div className="text-center">
        <h2 className='text-success fw-bold cf-title mb-2'>Most Discounted products</h2>
        <div className="scroll-container-c-f green p-3">
          <div className="scroll-content">
          {products.length > 0 ? (
            products.map((product) => (<Card key={product.id} product={product} />))
          ) : (
            <p>No Most Discounted Products available.</p>
          )}
          </div>
        </div>
      </div>
    </>
}

export default MostDiscountedProducts;