import React, { useState } from "react";
import { api } from "../../axios";
import { useNavigate } from "react-router-dom";
import './AddToCart.css';

const AddToCartComponent = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You need to sign in first.");
      navigate('/user/sign-in');
      return;
    }

    try {
      const headers = {
        Authorization: token,
      };

      const response = await api.post("/cart/add-to-cart", { productId: product.productId, quantity }, { headers });
      console.log(response.data);
      setMessage(response.data.message || "Added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Failed to add item to cart. Please try again.");
    }
  };

  return <>
    <div className="add-to-cart-container">
      <div className="quantity-input">
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
      </div>
      <div className="button-container">
        <button className="btn btn-success btn-sm" onClick={handleAddToCart}>Add to Cart</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  </>
};

export default AddToCartComponent;
