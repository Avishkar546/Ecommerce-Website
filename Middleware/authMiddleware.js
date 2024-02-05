import Jwt, { decode } from "jsonwebtoken";
import User from "../models/userModel.js";

// Check valid user
export const fetchUser = (req, res, next) => {

    const token1 = req.header("Authorization");
    // If no token
    if (!token1) {
        return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    }

    const token = token1.replace('Bearer ', '');
    try {
        // Verify the token
        const decoded = Jwt.verify(token, process.env.JWT_KEY);

        // Attach the user object to the request for further use in the route handler
        req.user = decoded.user;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }
};

// Check valid Admin middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(200).json({success:false, message: "Unauthorized access to Admin portal" });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.send("Internal Server Error");
    }
}