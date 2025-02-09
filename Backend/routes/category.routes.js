import { createBulkCategory, createCategory, deleteCategory, getAllCategories, getAllCategoryByVendor, getAllProductsByCategoryId, updateCategory } from "../controller/category.controller.js";
import express from 'express'; 
import { authenticateToken } from "../middleware/isAuthenticate.js";
const router = express.Router();

router.post('/create-category', createCategory);
router.delete('/:categoryId', deleteCategory)
router.put('/:categoryId', updateCategory);
router.get('/get-all', getAllCategories );
router.get('/all-product/:categoryId', getAllProductsByCategoryId);
router.get('/all-categories/:vendorId', getAllCategoryByVendor);

router.post('/create-bulk',  createBulkCategory);


export default router;