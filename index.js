const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

//rest object
const app = express();

// configure dotenv File
dotenv.config(); // .env is in root directory therefore no need to add path option.

app.get("/", (req, res) => {
  res.send("Node js Ecommerce project");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`.bgYellow.black);
});
