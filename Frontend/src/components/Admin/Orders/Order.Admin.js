import { useEffect, useState } from "react";
import { api } from "../../../axios";
import AdminHeader from "../AdminHeader.js/AdminHeader";
import './Order.Admin.css';

function OrderForAdmin() {
    const [orders, setOrders] = useState();

    useEffect(() => {
        loadData().then(res => {
            if (res.data.operation) {
                console.log(res.data.orders);
                setOrders(res.data.orders);
            }
        });
    }, []);

    const loadData = async () => await api.get('/order/get-all');

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {orders?.map((item, index) => (
                        <div className="order-card card p-2 mt-2" key={index}>
                            <div className="d-flex flex-column align-items-start">
                                <p><strong>Username:</strong> {item.billingDetails.fullName}</p>
                                <p><strong>Product Name:</strong> {item.orderItems.product_id.name}</p>
                                <p><strong>Order Status:</strong> {item.orderStatus}</p>
                                <p><strong>Payment Method:</strong> {item.paymentInfo.method}</p>
                                <p><strong>Payment Status:</strong> {item.paymentInfo.status}</p>
                            </div>

                            <details className="mt-2">
                                <summary>Address Details</summary>
                                <div className="address-details mt-2 rounded p-2">
                                    <p><strong>City:</strong> {item.billingDetails.city}</p>
                                    <p><strong>State:</strong> {item.billingDetails.state}</p>
                                    <p><strong>Postal Code:</strong> {item.billingDetails.postalCode}</p>
                                    <p><strong>Contact Number:</strong> {item.billingDetails.contactNumber}</p>
                                    <p><strong>Order Date:</strong> {item.orderDate}</p>
                                </div>
                            </details>

                            <details className="mt-2">
                                <summary>Additional Details</summary>
                                <div className="additional-details mt-2 rounded p-2">
                                    <p><strong>Price:</strong> {item.orderItems.product_id.price}</p>
                                    <p><strong>Quantity:</strong> {item.orderItems.quantity}</p>
                                    <p><strong>Carbon Footprint:</strong> {item.orderItems.product_id.carbonFootprint}</p>
                                    <p><strong>Discount:</strong> {item.orderItems.product_id.discount}</p>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default OrderForAdmin;
