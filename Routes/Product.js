import express from 'express';
import { fetchUser, isAdmin } from '../Middleware/authMiddleware.js';
import { createProductController, delteProductController, getAllProductsController, getPhotoController, getSingleProductController, updateProductController } from '../Controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// 1. Create a new product
// 2. Get All products
// 3. Get Single product
// 4. Get product image
// 5. Delete product
// 5. Update product
router.post('/create-product', fetchUser, isAdmin, formidable(), createProductController);
router.get("/get-all-products", getAllProductsController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", getPhotoController)
router.delete("/delete-product/:id", fetchUser, isAdmin, delteProductController);
router.put("/update-product/:id", fetchUser, isAdmin, updateProductController);

export default router;
