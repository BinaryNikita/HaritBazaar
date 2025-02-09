import express from 'express';
import { addProduct, addProductByFile, bulkAdd, deleteProduct, getAllProduct, getAllProductOfVendor, getProductByID, productRecommendation, searchProduct, updateProduct } from '../controller/product.controller.js';
import {authenticateToken} from "../middleware/isAuthenticate.js"
import multer from "multer"
const storage = multer.diskStorage({
    filename :  (req, file, callback)=>{
        const unique =  Date.now() + file.originalname
        callback(null, unique)
    },
    destination : (req,file,callback)=>{
        callback(null, "public/products/")
    }
})
const upload = multer({storage})

const router = express.Router();

router.post('/bulk-add', bulkAdd);
router.get('/all-products', getAllProduct);
router.get('/vendor-products',authenticateToken, getAllProductOfVendor);

// Adding single product
router.post('/add-product',upload.array("image"), authenticateToken, addProduct);

router.delete('/:productId',authenticateToken, deleteProduct);
router.patch('/:productId',authenticateToken, updateProduct);
router.get('/recommendation/:productId', productRecommendation);
router.get('/search-product', searchProduct);
router.get('/:productId', getProductByID)

export default router;