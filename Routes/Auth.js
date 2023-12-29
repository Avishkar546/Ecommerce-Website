import Express from "express";
import { registerController, loginController, testController } from "../Controllers/authController.js";
import { fetchUser, isAdmin } from "../Middleware/authMiddleware.js";

const router = Express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", fetchUser, isAdmin ,testController);

export default router;