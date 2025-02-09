import { useEffect, useState } from "react";
import { api } from "../../../axios";
import { useParams } from "react-router-dom";
import AdminHeader from "../AdminHeader.js/AdminHeader";
import './VendorDetails.css';

function VendorDetail() {
    const params = useParams();
    const [vendor, setVendor] = useState();
    const [products, setProducts] = useState();
    const [orders, setOrders] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let vendor = await getVendor();
        console.log(vendor.data.result);
        setVendor(vendor.data.result);

        let orders = await getOrders();
        console.log(orders.data.result);
        setOrders(orders.data.result);

        const product = await getProducts();
        console.log(product.data.result);
        setProducts(product.data.result);
    };

    const header = { headers: { Authorization: localStorage.getItem('token') } };
    const getVendor = async () => await api.get(`/admin/getVendorById/${params.vendorId}`, header);
    const getOrders = async () => await api.get(`/admin/getVendorOrders/${params.vendorId}`, header);
    const getProducts = async () => await api.get(`/admin/getVendorProducts/${params.vendorId}`, header);

    return (
        <>
            <AdminHeader />
            <div className="container-fluid mt-5">
                <div className="row">
                    {/* Vendor Profile */}
                    <div className="col-md-4">
                        <div className="user-profile">
                            <div className="p-2 mt-2 card bg-light rounded">
                                <h4 className="fw-bold text-success">Name: {vendor?.user_id.name}</h4>
                                <p><strong>E-mail: {vendor?.businessEmail}</strong></p>
                                <p><strong>Role: Vendor</strong></p>
                                <p><strong>Address: {vendor?.businessAddress}</strong></p>
                                <p><strong>Phone Number: {vendor?.phoneNumber}</strong></p>
                            </div>
                        </div>
                    </div>

                    {/* Orders */}
                    <div className="col-md-8">
                        <div className="row">
                            <h3 className="text-success fw-bold">Orders</h3>
                            <div className="d-flex flex-wrap justify-content-center">
                                {orders?.map((order, index) => (
                                    <div key={index} className="card col-md-5 m-2 p-2 order-card">
                                        <h3 className="card-title text-success">{order.name}</h3>
                                        <p><strong>Quantity: {order.orderItems.quantity}</strong></p>
                                        <p>Order Status: <strong className={`${order.orderStatus === "Cancelled" ? "text-danger" : order.orderStatus === "Delivered" ? "text-success" : "text-warning"}`}>{order.orderStatus}</strong></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="row mt-4">
                    <h2 className="m-4 fw-bold text-success">Products</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {products?.map((product, index) => (
                            <div key={index} className="card m-2 p-2 product-card">
                                <div className="d-flex justify-content-center">
                                    <img className="rounded product-image" src={product.image[0]} alt={product.name} />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-dark card-title">{product.name}</h4>
                                    <p className="cart-text">{product.description}</p>
                                    <p>Rs. <strong className="text-success">{product.price}</strong></p>
                                    <p>Carbon FootPrint: <strong>{product.carbonFootprint}</strong></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorDetail;
