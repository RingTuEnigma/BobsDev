const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getASpecificProduct);
router.get("/:id/Category", getCategoryOfProduct);
router.post("/", createAProduct);
router.delete("/:id", deleteASpecificProduct);
router.patch("/:id", updateASpecificProduct);

//GET
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
}

//GET /id
async function getASpecificProduct(req, res) {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
}

//GET /id/Category
async function getCategoryOfProduct(req, res) {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const category = await Category.findOne({ _id: product.categoryid });
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
}

//POST
async function createAProduct(req, res) {
  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    categoryid: req.body.categoryid
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
}

//PATCH
async function updateASpecificProduct(req, res) {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
}

//DELETE
async function deleteASpecificProduct(req, res) {
  try {
    const removedProduct = await Product.findOneAndDelete({
      _id: req.params.id
    });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
}

module.exports = router;
