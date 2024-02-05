import Express from "express";
import { fetchUser, isAdmin } from "../Middleware/authMiddleware.js";
import { CreateCategory, modifyCategoryController, getCategoriesController, deleteCategoryController, singleCategory } from "../Controllers/categoryController.js";


const Categoryrouter = Express.Router();

// CRUD operation APIs
Categoryrouter.post("/create-category",fetchUser, isAdmin, CreateCategory);
Categoryrouter.get("/get-all-categories", getCategoriesController);
Categoryrouter.get("/single-category/:slug", singleCategory);
Categoryrouter.put("/update-category/:id", fetchUser, isAdmin, modifyCategoryController);
Categoryrouter.delete("/delete-category/:id", fetchUser, isAdmin, deleteCategoryController);

export default Categoryrouter;