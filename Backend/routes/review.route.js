import express from "express"
import { authenticateToken } from '../middleware/isAuthenticate.js'
import { addReviews, canReview, getReviews } from "../controller/reviews.controller.js"
const router = express.Router()

router.get('/all-reviews/:productId', getReviews)
router.get('/can-review/:productId', authenticateToken,canReview);
router.post('/addReview/:productId', authenticateToken, addReviews);

export default router;