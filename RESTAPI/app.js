const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Import Routes
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES
app.use("/ProductModel/Products", productsRoute);
app.use("/ProductModel/Categories", categoriesRoute);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, dbName: "ProductModel" },
  () => {
    console.log("Connected to Database!");
  }
);

//Start listening to the server at a specific port
app.listen(3000);
