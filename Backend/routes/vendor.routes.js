import { addProductByFile } from "../controller/product.controller.js";
import { createVendor } from "../controller/vendor.controller.js";
import { authenticateToken } from "../middleware/isAuthenticate.js";
import multer from "multer";
import express from 'express';

const storage = multer.memoryStorage();
const upload = multer({storage})

const router = express.Router();
router.post('/new-vendor', authenticateToken,  createVendor);

// Adding products by excel file
router.post('/add-product-by-file', upload.single("excelFile"), authenticateToken, addProductByFile);

export default router;