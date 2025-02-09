import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import Header from '../FrontPage/Header/Header';
import Footer from '../FrontPage/Footer';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css'

const CartComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [showBulkOrderForm, setShowBulkOrderForm] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    contactNumber: '',
    paymentInfo: {
      method: paymentMethod,
    },
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      paymentInfo: { method: e.target.value },
    }));
  };

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    if (!token) {
      setError('You need to sign in first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const headers = { Authorization: localStorage.getItem('token') };
      const response = await api.get('/cart/get-cart', { headers });
      if (response.data && response.data.data) {
        console.log(response.data.data)
        setCart(response.data.data);
      } else {
        setError('Unexpected response format.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to load cart items. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!token) {
      setError('You need to sign in first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const headers = { Authorization: localStorage.getItem('token') };
      const response = await api.delete(`/cart/${productId}`, { headers });
      alert(response.data.message || 'Item removed from cart successfully!');
      fetchCart();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to remove item from cart. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBulkOrderSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('You need to sign in first.');
      return;
    }

    setLoading(true);
    setError('');

    const orderData = {
      orderItems: cart?.cartItems?.map((item) => ({
        product_id: item.product_id._id,
        quantity: item.quantity,
      })),
      billingDetails: {
        fullName: billingDetails.fullName,
        address: billingDetails.address,
        city: billingDetails.city,
        postalCode: billingDetails.postalCode,
        contactNumber: billingDetails.contactNumber,
      },
      paymentInfo: {
        method: paymentMethod,
      }
    };

    try {
      const headers = { Authorization: localStorage.getItem('token') };
      console.log(orderData);
    if (paymentMethod == "COD") {
      const response = await api.post('/order/bulk-order', orderData, { headers, });
      if (response.data.operation) {
        alert('Order placed successfully!');
        navigate('/orders')
      }
    }
    else {
      navigate(`/make-payment/${cart?.totalAmount?.toFixed(2)}`,{state: {orderData}})
    }

      setShowBulkOrderForm(false);
      fetchCart();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to place bulk order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid cart-container p-5">
        <h1 className="text-center mb-4 fw-bold h3">Sustainable Cart</h1>
        {loading && <p className="text-center text-info">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row justify-content-center">
          {cart?.cartItems?.length > 0 ? (
            cart.cartItems?.map((item) => (
              <div key={item.product_id._id} className="col-lg-6 mb-4 p-2">
                <div className="card cart-card rounded-3">
                  <div className="card-body d-flex">
                    <div className='image-container p-2 w-50'>
                      <img onClick={() => navigate(`/product/${item.product_id._id}`)} className='card-img-top cart-item-image rounded' src={item.product_id.image[0]} />
                    </div>
                    <div className='detail w-50 p-3'>
                      <h5 className="card-title text-success fw-bold">{item.product_id.name}</h5>
                      <p className="card-text"><strong>Price:</strong> Rs. {item.product_id.price}</p>
                      <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                      <button
                        className="btn btn-outline-danger btn-sm mt-3"
                        onClick={() => handleRemoveFromCart(item.product_id._id)}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No items in the cart.</p>
          )}
        </div>

        {/* TOTAL AND BUTTONS */}
        <div className="text-center mt-3 mb-5">
          <h2 className="text-center h4 t-a">Total Amount: Rs. <strong>{cart?.totalAmount?.toFixed(2)}</strong></h2>
          <button
            className="btn place-order-btn btn-lg mb-4"
            onClick={() => setShowBulkOrderForm(true)}
            disabled={loading || cart?.items?.length === 0}
          >
            {loading ? 'Placing Bulk Order...' : 'Place Order'}
          </button >
        </div>
        {/* Bulk Order Form */}
        {showBulkOrderForm && (
          <div className="container my-5">
            <form className='form-group b-o-form' onSubmit={handleBulkOrderSubmit}>
              <h4>Billing Details</h4>

              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={billingDetails.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="addressLine1" className="form-label">Address Line 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  value={billingDetails.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                  value={billingDetails.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Payment Method */}
              <h4>Payment Method</h4>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="online"
                  name="paymentMethod"
                  value="Online"
                  checked={paymentMethod === 'Online'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="form-check-label" htmlFor="online">
                  Online Payment
                </label>
              </div>

              {paymentMethod == "Online" ? <button className='btn btn-success mt-4'>Make Payment</button>
                : <button
                  type="submit"
                  className="btn btn-success mt-4"
                  disabled={loading}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>}

            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default CartComponent;