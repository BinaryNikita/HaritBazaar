import express from 'express';
import { bulkOrder, cancelOrder, getOrderDetails, getOrderForAdmin, getUserOrders, getVendorOrders, placeOrder, updateOrder } from '../controller/order.controller.js';
import { authenticateToken } from '../middleware/isAuthenticate.js';
const router = express.Router();

router.get('/vendor-orders', authenticateToken, getVendorOrders);
router.get('/get-all', getOrderForAdmin);
router.get('/user-orders', authenticateToken, getUserOrders);
router.get('/order-details/:orderId', authenticateToken, getOrderDetails);
router.post('/place-order', authenticateToken, placeOrder);
router.delete('/cancel-order/:orderId', authenticateToken, cancelOrder);
router.patch('/update-order/:orderId', authenticateToken, updateOrder);
router.post('/bulk-order',authenticateToken, bulkOrder);
export default router;
