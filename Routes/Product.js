import express from 'express';
import { fetchUser, isAdmin } from '../Middleware/authMiddleware.js';
import { createProductController} from '../Controllers/productController.js';
import formidable from 'express-formidable';
import ExpressFormidable from 'express-formidable';

const router = express.Router();

// Create a new product
router.post('/create-product', fetchUser, isAdmin, formidable(), createProductController);


export default router;
