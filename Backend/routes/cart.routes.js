import express from "express";
import { authenticateToken } from "../middleware/isAuthenticate.js";
import { addToCart, getCartItem, deleteCartItem } from '../controller/cart.controller.js';
const router = express.Router();

router.post("/add-to-cart", authenticateToken, addToCart);
router.get("/get-cart", authenticateToken, getCartItem);
router.delete("/:productId", authenticateToken, deleteCartItem);


export default router;