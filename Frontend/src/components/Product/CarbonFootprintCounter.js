import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { api } from '../../axios';

const CarbonFootprintPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/all-products');

      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
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

  const toggleProductSelection = (product) => {
    const isAlreadySelected = selectedProducts.find(
      (p) => p._id === product._id
    );

    if (isAlreadySelected) {
      setSelectedProducts((prev) => prev.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const calculateTotalCarbonFootprint = () => {
    return selectedProducts.reduce(
      (total, product) => total + (product.carbonFootprint || 0),
      0
    );
  };

  const placeBulkOrder = async () => {
    try {
      const orderData = selectedProducts.map((product) => ({
        productId: product._id,
        quantity: 1, // Assuming 1 quantity of each selected product for the bulk order
      }));

      const response = await api.post('/order/bulk-order', {
        orders: orderData,
      });

      if (response.status === 200) {
        alert('Bulk order placed successfully!');
        setSelectedProducts([]); // Reset the selected products
      } else {
        alert('Error placing bulk order!');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing bulk order!');
    }
  };

  if (loading)
    return (
      <div className="spinner-container text-center">
        <Spinner animation="border" /> Loading products...
      </div>
    );

  if (error)
    return (
      <div className="text-center">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="container p-5">
      <div className="bg-light p-4 rounded mb-5">
        <h1 className="text-center text-success mb-3">
          What is Carbon Footprint?
        </h1>
        <p className="text-muted text-center">
          A <strong>carbon footprint</strong> measures the total amount of
          greenhouse gases produced directly or indirectly by human activities,
          usually expressed in equivalent tons of CO₂. Every product we use
          contributes to our carbon footprint—from its production,
          transportation, and usage to its disposal.
        </p>
        <h5 className="text-center mt-3 text-primary">Why is it Important?</h5>
        <p className="text-center">
          Reducing your carbon footprint is a key step toward combating climate
          change. By making sustainable choices, you can help lower greenhouse
          gas emissions and protect the environment for future generations.
        </p>
        <p className="text-center">
          Use this tool to calculate the carbon footprint of your purchases and
          make more eco-friendly choices!
        </p>
      </div>

      <div className="bg-light p-4 mt-4 rounded">
        <h2 className="text-center">Your Selected Products</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product._id}>
              {product.name} - Carbon Footprint:{' '}
              {product.carbonFootprint || 'N/A'} kg CO₂
            </li>
          ))}
        </ul>

        <h3 className="text-center mt-4">
          Total Carbon Footprint: {calculateTotalCarbonFootprint()} kg CO₂
        </h3>

        <div className="text-center">
          <button
            className="btn btn-warning"
            onClick={placeBulkOrder}
            disabled={selectedProducts.length === 0}
          >
            Place Bulk Order
          </button>
        </div>
      </div>

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={product.image?.[0] || 'https://via.placeholder.com/150'}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    Price: Rs. {product.price.toFixed(2)}
                  </p>
                  <p className="card-text">
                    Carbon Footprint: {product.carbonFootprint || 'N/A'} kg CO₂
                  </p>
                  <button
                    className={`btn ${
                      selectedProducts.find((p) => p._id === product._id)
                        ? 'btn-danger'
                        : 'btn-success'
                    }`}
                    onClick={() => toggleProductSelection(product)}
                  >
                    {selectedProducts.find((p) => p._id === product._id)
                      ? 'Remove'
                      : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintPage;
