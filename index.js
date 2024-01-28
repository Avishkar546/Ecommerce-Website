// We are using ES module type npm packages using import.
import express from "express";
import formidableMiddleware from 'express-formidable';
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import Authrouter from "./Routes/Auth.js";
import Categoryrouter from "./Routes/Category.js";
import productRouter from "./Routes/Product.js"
import cors from "cors";

//rest object
const app = express();

// configure dotenv File. .env is in root directory therefore no need to add path option.
dotenv.config(); // 

// Connection to mongoDB database
connectDB();

app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended:false, limit: '50mb' }));
app.use(cors());
// It is middleware which logs the request. Basically used in production no need in deployment.
app.use(morgan('dev'));
// The express middleware to parse the files in form data

app.get("/", (req, res) => {
  res.send("Node js Ecommerce project");
});

// Backend Routes
app.use('/api/v1/auth', Authrouter);
app.use('/api/v1/category', Categoryrouter);
app.use('/api/v1/product', productRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`.bgYellow.black);
});
