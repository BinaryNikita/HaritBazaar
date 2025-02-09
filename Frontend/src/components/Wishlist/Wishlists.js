import { useEffect, useRef, useState } from "react";
import { api } from "../../axios";
import { Link } from "react-router-dom";
import Header from "../FrontPage/Header/Header";
import Footer from "../FrontPage/Footer";
import './Wishlist.css'

function Wishlist() {
    const [wishlist, setWishlist] = useState();
    const wishlistName = useRef();
    useEffect(() => {
        loadData().then(res => {
            console.log(res.data);
            setWishlist(res.data.list);
        });
    }, []);
    useEffect(() => { }, [wishlist]);
    const loadData = async () => api.get('/wishlist/getWishlist', { headers: { Authorization: localStorage.getItem('token') } });

    const sendData = () => api.post('/wishlist/new-wishlist', { wishlistName: wishlistName.current.value }, { headers: { Authorization: localStorage.getItem('token') } });

    const handleAdd = (event) => {
        event.preventDefault();
        sendData().then(res => {
            if (res.data.operation) {
                loadData().then(res => setWishlist(res.data.list));
            }
        });
    };
    
    return (
        <>
            <Header/>
            <div className="container mt-5 wishlist-container">
                <h4 className="mb-3 h3 fw-bold">My Wishlist</h4>
                <ul className="list-group">
                    {wishlist?.map((list, index) => (
                        <Link className="m-1" to={`products/${list._id}`} key={index} style={{ textDecoration: "none" }}>
                            <li className="list-group-item wishlist-item rounded">
                                {list.wishlistName}
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="mt-3 add-wishlist-form">
                    <form onSubmit={handleAdd}>
                        <div className="input-group mt-3">
                            <input ref={wishlistName} type="text" required placeholder="Enter Wishlist Name" className="form-control" />
                            <button type="submit" className="btn btn-success">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default Wishlist;
