import { useEffect, useState } from "react";
import { api } from "../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './EditProduct.css'
import Footer from "../../FrontPage/Footer";

function EditProduct() {
    const [product, setProduct] = useState();
    const token = localStorage.getItem('token')
    const params = useParams()
    const navigate = useNavigate();

    // GETTING PRODUCT DETAIL
    useEffect(() => {
        getData().then(response => {
            setProduct(response.data.product);
        });
    }, []);
    
    const getData = async () => await api.get(`/product/${params.productId}`, { headers: { Authorization: token } });

    useEffect(() => {}, [product]);

    // SENDING UPDATE REQUEST
    const updateProduct = () => {
        sendRequest().then(response => {
            if (response.data.operation) {
                navigate("/manage-products");
            }
        }).catch(err => {
            console.log(err);
        });
    }
    
    const sendRequest = async () => await api.patch(`/product/${params.productId}`, { product }, { headers: { Authorization: token } });

    // DELETE PRODUCT
    const deleteProduct = () => {
        deleteRequest().then(response => {
            console.log(response.data);
            if (response.data.operation) navigate("/manage-products");
        }).catch(err => {
            console.log(err);
        });
    }
    
    const deleteRequest = async () => await api.delete(`/product/${params.productId}`, { headers: { Authorization: token } });

    // CHANGING INPUT 
    const changeDesc = (e, name) => {
        product.description = e.target.value;
        setProduct({ ...product });
    }
    
    const changePrice = (e, name) => {
        product.price = e.target.value;
        setProduct({ ...product });
    }
    
    const changeQuantity = (e, name) => {
        product.quantity = e.target.value;
        setProduct({ ...product });
    }
    
    const changeName = (e, name) => {
        product.name = e.target.value;
        setProduct({ ...product });
    }

    return <>
        <div className="row">
            <LeftSide product={product} />
            <div className="col-md-5 mt-2">
                <div className="d-flex p-2">
                    <label style={{ minWidth: "20%" }} className="text-muted" htmlFor="name">Name: </label>
                    <input className="form-control" type="text" name="name" value={product?.name} onChange={changeName} />
                </div>

                <div className="d-flex p-2">
                    <label style={{ minWidth: "20%" }} className="text-muted" htmlFor="description">Description: </label>
                    <input className="form-control" type="text" name="description" value={product?.description} onChange={changeDesc} />
                </div>

                <div className="d-flex p-2">
                    <label style={{ minWidth: "20%" }} className="text-muted" htmlFor="price">Price: </label>
                    <input className="form-control" type="number" name="price" value={product?.price} onChange={changePrice} />
                </div>

                <div className="d-flex p-2">
                    <label style={{ minWidth: "20%" }} className="text-muted" htmlFor="quantityAvailable">Quantity: </label>
                    <input className="form-control" type="number" name="quantityAvailable" value={product?.quantity} onChange={changeQuantity} />
                </div>

                <div className="d-flex flex-column mt-5">
                    <button onClick={updateProduct} className="btn btn-outline-success mt-1 w-100">Update</button>
                    <button onClick={deleteProduct} className="btn btn-outline-danger mt-1 w-100">Delete</button>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

function LeftSide({ product }) {

    const [images, setImages] = useState(product?.image);
    useEffect(() => {}, [images]);
    
    const handleImageClick = (index) => {
        const main = product.image[0];
        product.image[0] = product.image[index];
        product.image[index] = main;

        setImages([...images]);
    };

    return (
        <div className="col-md-6 mt-2">
            <div className="d-flex align-items-center justify-content-center">
                <img style={{ height: "70vh" }} src={product?.image[0]} alt="Product" />
            </div>
            <div style={{ borderRadius: "5px" }} className="d-flex mt-3 bg-dark justify-content-around">
                {images?.map((image, index) => (
                    <img 
                        style={{ height: "100px", maxWidth: "30%" }} 
                        key={index} 
                        src={product?.image[index]} 
                        alt={`Product ${index}`}
                        onClick={() => handleImageClick(index)} 
                    />
                ))}
            </div>
        </div>
    );
}

export default EditProduct;
