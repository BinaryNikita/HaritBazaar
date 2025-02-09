import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../FrontPage/Header/Header';
import Footer from '../FrontPage/Footer';
import './OrderDetail.css';

function OrderDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { order } = location.state;
    const [error, setError] = useState(null);

    const cancelOrder = async (orderId) => {
        try {
            const response = await api.delete(`/order/cancel-order/${orderId}`, { headers: { Authorization: localStorage.getItem('token') } });
            console.log(response.data);
            if (response.data.operation) {
                setError(response.data.msg)
                setTimeout(()=>navigate('/orders'),2000);
            } else {
                setError(response.data.msg);
                setTimeout(()=>setError(""),3000)
            }
        } catch (err) {
            console.error('Error cancelling order:', err);
            setError('Failed to cancel the order. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="container eco-order-detail-container mt-2 p-5">
                <div className="card eco-order-detail-card shadow-sm">
                    <div className="d-flex eco-order-detail-body row">
                        {error && <div className="alert alert-danger text-center eco-order-error col-12">{error}</div>}
                        <div className=' col-lg-6 order-image-container p-2'><img className='order-image w-100 h-100 rounded shadow-sm' src={order.orderItems.product_id.image[0]} alt={order.orderItems.product_id.name} /></div>

                        <div className='col-lg-5 mt-3 '>
                            <h5 className="card-title eco-order-title">Order ID: {order?._id}</h5>

                            <p className="card-text eco-order-text d-flex flex-row">
                                <strong>Status:</strong> <p className='fw-bold text-warning'>{order?.orderStatus}</p>
                            </p>

                            <hr/>
                            <hr/>
                            
                            <h6 className="mt-3 eco-section-title">Billing Details:</h6>
                            <ul className="list-unstyled eco-billing-details">
                                <li><strong>Full Name:</strong> {order?.billingDetails?.fullName}</li>
                                <li><strong>Address:</strong> {order?.billingDetails?.address}</li>
                                {/* <li><strong>City:</strong> {order?.billingDetails?.city}, {order?.billingDetails?.state}</li> */}
                                <li><strong>Postal Code:</strong> {order?.billingDetails?.postalCode}</li>
                                <li><strong>Contact:</strong> {order?.billingDetails?.contactNumber}</li>
                            </ul>

                            <p className="card-text eco-order-text">
                                <strong>Order Date:</strong> {new Date(order?.orderDate).toLocaleString()}
                            </p>

                            {/* <h6 className="mt-3 eco-section-title">Order Item:</h6>
                            <Link to={`/product/${order?.orderItems?.product_id?.name}`} className="eco-product-link fw-bold">
                                {order.orderItems?.product_id.name}
                            </Link> */}

                            <hr/>
                            <hr/>

                            <h6 className="mt-3 eco-quantity">Quantity: {order?.orderItems?.quantity}</h6>

                            <p className="card-text eco-order-text fw-bold text-dark">
                                <strong>Total:</strong> RS. {(order?.orderItems?.product_id?.price -
                                    (order?.orderItems?.product_id?.price * order?.orderItems?.product_id?.discount) / 100).toFixed(2)}
                            </p>

                            {order.orderStatus === 'Pending' && (
                                <button className="btn btn-danger btn-sm mt-3 eco-cancel-btn" onClick={() => cancelOrder(order._id)}>
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderDetail;
