import { useEffect, useState } from "react";
import { api } from "../../../axios";
import AdminHeader from "../AdminHeader.js/AdminHeader";
import './admin.product.css';

function AdminProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData().then((res) => {
            setProducts(res.data.products);
        });
    }, []);

    const loadData = async () => await api.get('/product/all-products');

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="row justify-content-center m-2 p-2">
                    {products?.map((product, index) => (
                        <Card key={index} product={product} loadData={loadData} setProducts={setProducts} />
                    ))}
                </div>
            </div>
        </>
    );
}

function Card({ product, loadData, setProducts }) {
    const handleDelete = (id) => {
        const deleteProduct = async () => await api.delete(`/product/${id}`, { headers: { Authorization: localStorage.getItem('token') } });
        deleteProduct().then(res => {
            if (res.data.operation) {
                loadData().then(res => setProducts(res.data.products));
            }
        });
    };

    return (
        <div className="col-md-6 col-lg-4 mt-2">
            <div className="card product-card">
                <img src={product.image[0]} className="card-img-top" alt="Product Image" />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <p className="card-text">Carbon Footprint: {product.carbonFootprint} kg</p>
                </div>
                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
        </div>
    );
}

export default AdminProduct;
