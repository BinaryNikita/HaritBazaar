import { useEffect, useRef, useState } from "react";
import { api } from "../../../axios";
import Header from "../../FrontPage/Header/Header";
import './OrderRequests.css';
import Footer from "../../FrontPage/Footer";

function OrderRequest() {
    const token = localStorage.getItem('token');
    const [orders, setOrders] = useState([]);
    const [selected, setSelected] = useState("All");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/order/vendor-orders", { headers: { Authorization: token } });
            setOrders(response.data.order);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Order Status Flow (Vendor cannot cancel orders)
    const getNextStatuses = (currentStatus) => {
        const statusMap = {
            "Pending": ["Processing"],
            "Processing": ["Shipped"],
            "Shipped": ["Delivered"],
            "Delivered": [],  // No further updates
            "Cancelled": [],  // Cannot be modified
        };
        return statusMap[currentStatus] || [];
    };

    // Update Order Status
    const updateOrder = async (newStatus, orderId) => {
        try {
            const response = await api.patch(`/order/update-order/${orderId}`, { status: newStatus }, { headers: { Authorization: token } });

            if (response.data.operation) {
                fetchOrders(); // Refresh orders
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    // Order Card Component
    const OrderCard = ({ order }) => {
        const statusRef = useRef();

        return (
            <div key={order._id} className="col-md-4 mb-4">
                <div className="card h-100">
                    <h5 className="card-title text-center mt-2 p-2 fw-bold">{order.name}</h5>
                    <div className="card-body d-flex flex-column m-0 p-0">
                        <p className="card-text">Quantity: {order.orderItems.quantity}</p>
                        <p className="card-text">Status: <strong>{order.orderStatus}</strong></p>
                    </div>
                    <div className="mt-2 p-2">
                        { !(order.status=="Candelled" || order.orderStatus=="Delivered") && <details className="mb-1 text-center">
                            <summary className="order-summary">Process Order</summary>
                            {(order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered") && (
                                <>
                                    <select ref={statusRef} className="form-control w-100">
                                        {getNextStatuses(order.orderStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => updateOrder(statusRef.current.value, order._id)} className="btn btn-outline-success mt-1">
                                        Update
                                    </button>
                                </>
                            )}
                        </details>}
                    </div>
                </div>
            </div>
        );
    };

    // JSX
    return (
        <>
            <Header />
            <div className="container mt-3">
                <h2 className="text-center mb-2 h3">Order List</h2>
                <select onChange={(e) => setSelected(e.target.value)} className="form-control mb-3">
                    <option>All</option>
                    <option>Pending</option>
                    <option value="Processing">Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                </select>
                <div className="row">
                    {orders
                        ?.filter(order => selected === "All" || order.orderStatus === selected)
                        .map(order => <OrderCard key={order._id} order={order} />)}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderRequest;