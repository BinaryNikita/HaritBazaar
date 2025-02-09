import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../axios";
import Header from "../FrontPage/Header/Header";
import Footer from "../FrontPage/Footer";
import './WishlistProduct.css'

function WishlistProducts() {
    const [items, setItems] = useState();
    const { productId } = useParams();
    useEffect(() => {
        loadData().then(res => {
            console.log(res.data.data.wishlistItems);
            setItems(res.data.data.wishlistItems);
        });
    }, []);
    useEffect(() => { }, [items]);
    const loadData = async () => await api.get('/wishlist/getItems/' + productId, { headers: { Authorization: localStorage.getItem('token') } });

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="wishlist-row row" style={{ minHeight: "70vh" }}>
                    {
                        items?.length ? (
                            items?.map((item, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="wishlist-card card h-100">
                                        <div className="p-3">
                                        <img src={item.image[0]} className="card-img-top" alt={item.productName} />
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title fw-bold">{item.name}</h3>
                                            <p className="card-text"><strong>Price: </strong> Rs.{item.price}</p>
                                            <p className="card-text"><strong>Carbon Footprint:</strong> {item.carbonFootprint} kg CO₂</p>
                                            {/* <a href="#" className="btn btn-success">Add to Cart</a> */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <p className="no-items-msg">No Item in this Wishlist</p>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default WishlistProducts;
