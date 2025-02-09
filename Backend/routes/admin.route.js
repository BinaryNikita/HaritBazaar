import express from "express"
import { getUserById, getUserCart, getUserOrders, getUserWishlist, getVendorById, getVendorOrders, getVendorProducts } from "../controller/admin.controller.js";
import { authenticateToken } from "../middleware/isAuthenticate.js";

const router = express.Router();

router.get('/getUserById/:userId', authenticateToken, getUserById);
router.get('/userCart/:userId', authenticateToken, getUserCart);
router.get('/userOrder/:userId', authenticateToken, getUserOrders);
router.get('/userWishlist/:userId', authenticateToken, getUserWishlist);

router.get('/getVendorById/:vendorId', authenticateToken, getVendorById)
router.get('/getVendorProducts/:vendorId', authenticateToken, getVendorProducts)
router.get('/getVendorOrders/:vendorId', authenticateToken, getVendorOrders)

export default router;