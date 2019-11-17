const express = require("express");
const Category = require("../models/Category");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getASpecificCategory);
router.get("/:id/Products", getProductsOfCategory);
router.post("/", createACategory);
router.delete("/:id", deleteASpecificCategory);
router.patch("/:id", updateASpecificCategory);

//GET
async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
}

//GET /id
async function getASpecificCategory(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
}

//GET /id/Products
async function getProductsOfCategory(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    const products = await Product.find({ categoryid: category._id });
    res.json(products);
  } catch (err) {
    res.json({ message: err });
  }
}

//POST
async function createACategory(req, res) {
  const category = new Category({
    name: req.body.name
  });
  try {
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    res.json({ message: err });
  }
}

//PATCH
async function updateASpecificCategory(req, res) {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.json({ message: err });
  }
}

//DELETE
async function deleteASpecificCategory(req, res) {
  try {
    const removedCategory = await Category.findOneAndDelete({
      _id: req.params.id
    });
    res.json(removedCategory);
  } catch (err) {
    res.json({ message: err });
  }
}
module.exports = router;
