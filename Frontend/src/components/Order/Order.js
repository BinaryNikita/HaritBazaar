import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { useNavigate } from 'react-router-dom';
import Header from '../FrontPage/Header/Header';
import Footer from '../FrontPage/Footer';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await api.get('/order/user-orders', { headers: { Authorization: localStorage.getItem('token') } });

      if (response.data && response.data.order) {
        const ord = response.data.order;
        ord.reverse()
        setOrders(ord);
      } else {
        console.warn('No orders found in the response data.');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-5 order-loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center order-error">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container eco-order-history">
        <h1 className="text-center eco-order-title fw-bold pt-3">Order History</h1>
        {orders.length > 0 ? (
          <div className="row mt-3">
            {orders.map((order) => (
              <div key={order._id} className="col-12 col-lg-6 col-lg-4 mb-4">
                <div className="card eco-order-card h-100 d-flex flex-row">
                  <div className="card-body-order p-3 w-75">
                    <h5 className="eco-order-id card-title p-2">Order ID: <strong className=''>{order._id}</strong></h5>
                    <p className="eco-order-price p-2">
                      <strong>Total:</strong> Rs. {(
                        order.orderItems.product_id.price -
                        (order.orderItems.product_id.price * order.orderItems.product_id.discount) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="eco-order-date p-2">
                      <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                    </p>
                    <button onClick={() => navigate('orderDetail', { state: { order } })} className='btn btn-sm p-1 mb-0 w-100 order-inspect text-dark'>Inspect</button>
                  </div>
                <div className='w-25 p-1'><img className='w-100 rounded' src={order.orderItems.product_id.image[0]}/></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center eco-no-orders">No orders found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Order;