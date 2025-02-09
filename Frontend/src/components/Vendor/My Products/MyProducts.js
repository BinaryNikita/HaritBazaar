import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../axios";
import Header from '../../FrontPage/Header/Header';
import './MyProduct.css'
import Footer from "../../FrontPage/Footer";
function MyProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState();
    const [categories, setCategory] = useState();
    const token = localStorage.getItem('token');
    const categoryRef = useRef();

    // FETCHING PRODUCTS
    useEffect(() => {
        getData().then(response => {
            console.log(response.data.product);
            setProducts(response.data.product);
        });

        // FETCHING CATEGORIES
        getCategory().then(response => {
            setSelected("All");
            setCategory(response.data.category);
        });

    }, []);

    const getData = async () => await api.get("/product/vendor-products", { headers: { Authorization: token } });
    const getCategory = async () => api.get("/category/get-all", { headers: { Authorization: token } });

    useEffect(() => { }, [categories]);
    useEffect(() => { }, [products]);

    // CATEGORY WISE
    const [select, setSelected] = useState();
    const categoryWise = () => {
        setSelected(categoryRef.current.value);
        setProducts([...products]);
        setCategory([...categories]);
    };

    // CARD
    const ManageProductCard = ({ product }) => {
        return (
            <div key={product.product_id} className="col-md-4 mt-3 ">
                <div className="card h-100 m-p-card">
                    <div className="mt-2 "><img src={product.image[0]} className="card-img-top rounded" alt={product.name} style={{ width: "100%" }} /></div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: {product.price}</p>
                        <p className="card-text">Quantity Available: {product.quantity}</p>
                    </div>
                    <button className="btn btn-outline-info" onClick={() => navigate(product._id)}>Edit</button>
                </div>
            </div>
        );
    };

    // OTHER CONTENT
    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="text-center fw-bold h3 mb-4">My Products Page</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Select a Category</h2>
                            <select onChange={categoryWise} ref={categoryRef} className="form-control">
                                <option key={0} className="list-group-item list-group-item-action" type="button">All</option>
                                {categories?.map((category, index) =>
                                    <option key={index + 1} className="list-group-item list-group-item-action" type="button"> {category.categoryName} </option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {products?.filter(item => item?.category_id?.categoryName == ((select != "All") ? select : item?.category_id?.categoryName)).map(product => <ManageProductCard product={product} />)}
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default MyProducts;
