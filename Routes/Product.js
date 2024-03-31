import express from 'express';
import { fetchUser, isAdmin } from '../Middleware/authMiddleware.js';
import { createProductController, 
        delteProductController, 
        filterProductController, 
        getAllProductsController, 
        getPhotoController, 
        getRelatedProducts, 
        getSingleProductController, 
        productCountController, 
        productListController, 
        serachProducts, 
        updateProductController } from '../Controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// 1. Create a new product
router.post("/create-product", fetchUser, isAdmin, formidable(), createProductController);

// 2. Get All products
router.get("/get-all-products", getAllProductsController);

// 3. Get Single product
router.get("/get-product/:slug", getSingleProductController);

// 4. Get product image
router.get("/product-photo/:pid", getPhotoController)

// 5. Delete product
router.delete("/delete-product/:id", fetchUser, isAdmin, delteProductController);

// 5. Update product
router.put("/update-product/:id", fetchUser, isAdmin, updateProductController);

// 6. Filter product
router.post("/filter-product", filterProductController);

// 7. Count number of products
router.get("/product-count", productCountController);

// 8. Get product for per page
router.get("/product-list/:page", productListController); // Make sure '/' before route start

// 9. Search product based on keywords
router.get("/search/:keywords", serachProducts);

// 10. Get similar products
router.get("/related-product/:pid/:cid", getRelatedProducts); // Make sure '/' before route start

export default router;
