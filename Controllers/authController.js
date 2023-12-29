import User from "../models/userModel.js"
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { hashing, compare } from "../Helpers/authHelper.js";

dotenv.config({ path: "../.env" });

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Checking validation of data
        if (!name || !email || !password || !phone || !address) {
            return res.status(401).json({
                success: false,
                message: "Incomplete user details",
            })
        }

        // Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(401).json({
                success: false,
                message: "User Already exists. Please login",
            })
        }

        // REGISTER USER
        const hashedPassword = await hashing(password);
        const registeredUser = await new User({ name, email, password: hashedPassword, phone, address }).save();

        res.status(201).json({
            message: "Registered Succesfully",
            registeredUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Error in registering",
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // If empty
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = await User.findOne({ email }); // Check for user in User database

        //If user dose not exists
        if (!user) {
            return res.status(400).json({ message: "User not found. Please register" });
        }

        const validUser = await compare(password, user.password); // Function used from authHelper to comapre password.
        // If user is not valid
        if (!validUser) {
            return res.status(200).json({ message: "Invalid credentials" });
        }

        console.log('Login succesfully');
        // Create the JSON web token for valid logged in user.
        const payload = {
            user: {
                _id: user._id
            }
        };
        const jwtToken = Jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' });

        // Send the user user web token in response to store it in localStorage.
        return res.status(200).json({ msg: "Login succesfully", jwtToken });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error });
    }
}

export const testController = (req, res) => {
    res.send("In test controller");
}