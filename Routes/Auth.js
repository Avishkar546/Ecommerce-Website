import Express from "express";
import { registerController, loginController, forgotPasswordController, resetPasswordController } from "../Controllers/authController.js";
import { fetchUser, isAdmin } from "../Middleware/authMiddleware.js";

const router = Express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// Protected route for User
router.get("/user-auth", fetchUser, (req, res) => {
    res.send({ success: true, message: "Authenticated User" });
})

// Protected route for Admin
router.get("/admin-auth", fetchUser, isAdmin, (req, res) => {
    res.send({ success: true, message: "Authenticated User" });
})

export default router;