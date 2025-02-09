import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../axios';
import './UserDetails.css';
import AdminHeader from '../AdminHeader.js/AdminHeader';

function UserDetails() {
    const [user, setUser] = useState();
    const [orders, setOrders] = useState();
    const [cart, setCart] = useState();
    const [wishlist, setWishlist] = useState();
    const params = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let user = await getUser();
        setUser(user.data.result);

        let orders = await getOrders();
        setOrders(orders.data.result);

        const cart = await getCart();
        setCart(cart.data.result);

        const wishlist = await getWishlist();
        setWishlist(wishlist.data.result);
    };

    const header = { headers: { Authorization: localStorage.getItem('token') } };
    const getUser = async () => await api.get(`/admin/getUserById/${params.userId}`, header);
    const getOrders = async () => await api.get(`/admin/userOrder/${params.userId}`, header);
    const getCart = async () => await api.get(`/admin/userCart/${params.userId}`, header);
    const getWishlist = async () => await api.get(`/admin/userWishlist/${params.userId}`, header);

    return (
        <>
            <AdminHeader />
            <div className="container-fluid mt-5">
                {/* UPPER PART */}
                <div className="row">
                    {/* LEFT (USER PROFILE) */}
                    <div className="col-md-5 user-profile">
                        <div className="p-2 mt-2 card bg-light rounded">
                            <h4 className="fw-bold text-success">Name: {user?.name}</h4>
                            <p><strong>E-mail: {user?.email}</strong></p>
                            <p><strong>Role: {user?.role}</strong></p>
                            <p><strong>Eco-Point: {user?.point}</strong></p>
                        </div>
                    </div>

                    {/* RIGHT (WISHLIST) */}
                    <div className="col-md-7 wishlist-section bg-light rounded">
                        <h3 className="fw-bold text-success">Wishlist</h3>
                        <div>
                            {wishlist?.map((item, index) => (
                                <details key={index} className="wishlist-item">
                                    <summary>{item.wishlistName}</summary>
                                    <div className="d-flex flex-wrap">
                                        {item.product_id?.length ? (
                                            item.product_id.map((product, idx) => (
                                                <div key={idx} className="product-item">
                                                    <img className="rounded product-image" src={product?.image[0]} alt={product.name} />
                                                    <p className="text-center"><strong>{product.name}</strong></p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Product in wishlist</p>
                                        )}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* LOWER PART */}
                <div className="row mt-4">
                    {/* LEFT (CART) */}
                    <div className="col-md-5 cart-section bg-light rounded">
                        <h4 className="cart-title m-2 text-success fw-bold">Cart</h4>
                        <div className="rounded">
                            {cart?.cartItems?.map((item, index) => (
                                <div key={index} className="d-flex justify-content-start rounded p-2 mt-2 bg-light cart-item">
                                    <div className="product-image-container">
                                        <img
                                            className="rounded product-image"
                                            src={item.product_id.image[0]}
                                            alt={item.product_id.name}
                                        />
                                    </div>
                                    <div className="cart-item-details">
                                        <h4>{item.product_id.name}</h4>
                                        <p><strong>Quantity: {item.quantity}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT (ORDERS) */}
                    <div className="col-md-7 orders-section bg-light rounded">
                        <h3 className="fw-bold text-success">Orders</h3>
                        <div>
                            {orders?.map((item, index) => (
                                <div key={index} className="d-flex justify-content-start mt-2 order-item">
                                    <div className="product-image-container">
                                        <img
                                            className="rounded product-image"
                                            src={item.orderItems.product_id.image[0]}
                                            alt={item.orderItems.product_id.name}
                                        />
                                    </div>
                                    <div className="order-item-details">
                                        <p><strong>{item.orderItems.product_id.name}</strong></p>
                                        <p>Quantity: {item.orderItems.quantity}</p>
                                        <p>Price: {item.orderItems.product_id.price}</p>
                                    </div>
                                    <div className="order-item-status">
                                        <p>Order Status: {item.orderStatus}</p>
                                        <p>City: {item.billingDetails.city}</p>
                                        <p>Payment method: {item.paymentInfo.method}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetails;
