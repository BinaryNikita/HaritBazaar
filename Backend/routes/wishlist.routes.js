import express, { Router } from "express";
import {getWishlist,addToWishlist,removeWishlist, createWishlist, getWishlitItems} from "../controller/wishlist.controller.js";
import {authenticateToken} from '../middleware/isAuthenticate.js'
const router =express.Router();

router.post("/addToWishlist",authenticateToken, addToWishlist);
router.get("/getWishlist", authenticateToken, getWishlist);
router.delete("/removeWishlist", authenticateToken, removeWishlist)
router.post("/new-wishlist", authenticateToken, createWishlist)
router.get("/getItems/:listId", authenticateToken, getWishlitItems)

export default router;