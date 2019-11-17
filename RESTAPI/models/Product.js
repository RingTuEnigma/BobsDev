const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  categoryid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", ProductSchema, "Products");
