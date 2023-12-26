// We are using ES module type npm packages using import.
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";

//rest object
const app = express();

// configure dotenv File. .env is in root directory therefore no need to add path option.
dotenv.config(); // 

// Connection to mongoDB database
connectDB();

app.use(express.json());
// It is middleware which logs the request. Basically used in production no need in deployment.
app.use(morgan('dev')); 

app.get("/", (req, res) => {
  res.send("Node js Ecommerce project");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`.bgYellow.black);
});
