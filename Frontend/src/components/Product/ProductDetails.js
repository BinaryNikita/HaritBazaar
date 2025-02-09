import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../axios';
import Review from './Review/Review';
import Header from '../FrontPage/Header/Header';
import Footer from '../FrontPage/Footer';
import Recommendation from './Recommendation/Recommendation';
import './ProductDetails.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/product/${productId}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Error fetching product details');
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await fetchProductDetails();
      setLoading(false);
    };

    fetchAllData();
  }, [productId]);

  const handleQuantityChange = (e) => {
    const quantity = Math.min(e.target.value, product.quantity);
    setOrderQuantity(quantity);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  const handlePlaceOrder = () => {
    navigate(`/place-order/${productId}`, {
      state: { product, orderQuantity },
    });
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        {product && (
          <>
            <div className="row">
              <LeftSide product={product} />
              <div className="col-md-6 product-info">
                <h2>{product.name}</h2>
                <p><strong>Description:</strong> {product.description}</p>
                <p>Rs. <strong className='text-danger' style={{ textDecoration: "line-through" }}>{product.price}</strong><strong className='text-success'> {(product.price - ((product.price * product.discount) / 100)).toFixed(2)}</strong></p>
                <p><strong>Category:</strong> {product.category_id?.categoryName || 'N/A'}</p>
                <p><strong>Type:</strong> {product.type || 'N/A'}</p>
                <p><strong>Available Quantity:</strong> {product.quantity}</p>
                <p><strong>Carbon Footprint:</strong> {product.carbonFootprint || 'N/A'}</p>

                <div className="mb-3">
                  <label htmlFor="orderQuantity" className="form-label">Select Quantity:</label>
                  <input
                    type="number"
                    id="orderQuantity"
                    className="form-control"
                    min="1"
                    max={product.quantity}
                    value={orderQuantity}
                    onChange={handleQuantityChange}
                  />
                </div>

                <p><strong>Discount:</strong> {product.discount || 0}%</p>
                <p><strong>Carbon Footprint:</strong> {product.carbonFootprint || 0} kg</p>

                <div className="mt-4">
                  <button onClick={handlePlaceOrder} className="btn btn-success">Place Order</button>
                  <button onClick={() => setPopUp(true)} className="btn btn-success mt-2">Add to Wishlist</button>
                </div>
                {popUp && <WishlistPopUp setPopUp={setPopUp} productId={productId} />}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row">
        <div className="col-md-7">
          <Review productId={productId} />
        </div>
        <Recommendation productId={productId} />
      </div>
      <Footer />
    </>
  );
};

// Wishlist POP UP
function WishlistPopUp({ setPopUp, productId }) {
  const [err, setError] = useState('');
  const list = useRef('');
  const [wishlists, setWishlists] = useState([]);

  const addWishlist = () => api.post("/wishlist/new-wishlist", { wishlistName: list.current.value }, { headers: { Authorization: localStorage.getItem('token') } });

  const addNewList = async (e) => {
    e.preventDefault();
    const status = checkDuplicate();
    if (status) {
      try {
        const response = await addWishlist();
        if (response.data.operation) {
          setWishlists([...wishlists, { wishlistName: list.current.value }]);
          setError('');
          list.current.value = '';
        } else {
          setError("Failed to create wishlist");
        }
      } catch (err) {
        setError("Failed to create wishlist");
      }
    } else {
      setError("Wishlist already exists");
    }
  };

  const checkDuplicate = () => {
    return !wishlists?.some(item => item.wishlistName === list.current.value);
  };

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await api.get('/wishlist/getWishlist', { headers: { Authorization: localStorage.getItem('token') } });
        setWishlists(response.data.list);
      } catch (err) {
        console.log(err);
      }
    };
    getWishlist();
  }, []);

  const addProductToList = async (wishlistName) => {
    try {
      const response = await api.post("/wishlist/addToWishlist", { productId, wishlistName }, { headers: { Authorization: localStorage.getItem('token') } });
      if (response.data.operation) {
        setError('');
        setPopUp(false);
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("Failed to add product to wishlist");
    }
  };

  const selected = useRef();

  return <>
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Wishlist</h5>
            <button type="button" className="close" onClick={() => setPopUp(false)}>
              <span>&times;</span>
            </button>
          </div>
          <select ref={selected}>
            {wishlists?.map((item, index) => <option key={index}>{item.wishlistName}</option>)}
          </select>
          <div className="modal-body">
            <input ref={list} placeholder="Make new Wishlist" className="form-control my-2" />
          </div>
          <div className="modal-footer">
            <button onClick={addNewList} type="submit" className="btn btn-primary mb-2">Add New List</button>
            <button onClick={() => addProductToList(selected.current.value)} className="btn btn-success">Confirm</button>
            <small className='form-control text-danger'>{err}</small>
          </div>
        </div>
      </div>
    </div>
  </>
}

function LeftSide({ product }) {
  const [images, setImages] = useState(product?.image || []);

  const handleImageClick = (index) => {
    const main = product.image[0];
    product.image[0] = product.image[index];
    product.image[index] = main;
    setImages([...images]);
  };

  return (
    <div className="col-md-6 d-flex justify-content-center flex-column">
      <img src={product.image[0]} alt={product.name} className="img-fluid rounded" style={{ maxHeight: '400px', objectFit: 'cover' }} />
      <div style={{ borderRadius: "5px", height: "20vh" }} className="d-flex mt-3 bg-dark w-100 justify-content-around">
        {product.image?.map((image, index) => (
          <img
            style={{ maxWidth: "30%", height: "19vh", objectFit: "cover" }}
            key={index}
            src={product?.image[index]}
            onClick={() => handleImageClick(index)}
            alt={`Thumbnail ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
