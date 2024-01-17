import User from "../models/userModel.js"
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import { hashing, compare } from "../Helpers/authHelper.js";

dotenv.config({ path: "../.env" });

// Utility function for forgot password functionality
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: process.env.EmailService,
        pass: process.env.Emailpass
    }
});


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body;
        // Checking validation of data
        if (!name || !email || !password || !phone || !address || !question) {
            return res.status(401).json({
                success: false,
                message: "Incomplete user details",
            })
        }

        // Check if user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.send({
                success: false,
                message: "User Already exists. Please login",
            })
        }

        // REGISTER USER
        const hashedPassword = await hashing(password);
        const registeredUser = await new User({ name, email, password: hashedPassword, phone, address, question }).save();

        res.send({
            success: true,
            message: "Registered Succesfully",
            registeredUser
        })

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error in registering",
            error
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // If empty
        if (!email || !password) {
            return res.status(400).send({ success: false, message: "Invalid credentials" });
        }

        const user = await User.findOne({ email }); // Check for user in User database

        //If user dose not exists
        if (!user) {
            return res.send({ success: false, message: "User not found. Please register" });
        }

        const validUser = await compare(password, user.password); // Function used from authHelper to comapre password.
        // If user is not valid
        if (!validUser) {
            return res.send({ success: false, message: "Invalid credentials" });
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
        return res.send({ success: true, message: "Login succesfully", jwtToken, user });

    } catch (error) {
        console.log(error);
        return res.status(400).send({ success: true, message: "Something went wrong", error });
    }
}

export const forgotPasswordController = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.send({
                success: true,
                message: "Please register yourself"
            })
        }

        const randomString = randomstring.generate();
        user.token = randomString;

        // Passing the token as a query
        const resetLink = `http://localhost:8080/api/v1/auth/reset-password/?token=${randomString}`

        const mailOptions = {
            from: "gaikwadavishkar546@gmail.com",
            to: "avishkarrgaikwad007@gmail.com",
            subject: "Password Reset",
            text: "This is reset password mail",
            html: `<p>Click the following link to reset your password: <a href='${resetLink}'>ResetLink</a></p>`,
        };

        const result = await transporter.sendMail(mailOptions, (error, info) => {
            console.log(process.env.Emailpass);
            if (error) {
                console.error('Error sending reset email:', error);
                return res.status(500).json({ message: 'Failed to send reset email' });
            }
            // console.log("Mail has beed sent succesfully", info);
            return res.json({ message: 'Reset email sent successfully' });
        });
        // return res.send("I am sending email");

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const resetPasswordController = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    const user = await User.findOne({ token });
    if (!user) {
        res.status(200).send({
            success: true,
            message: "Unathorized access"
        })
    }

    const updatedUser = await User.findByIdAndUpdate({_id:user._id},{password:password, token:""},{new:true});
    res.status(200).send({
        success: true,
        message: "Password updated succesfully"
    })
}