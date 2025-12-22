const express = require("express");
const router = express();
const Product = require("../model/productModel");
const {
  validatedProduct,
  validation,
} = require("../validation/productValidation");
const permission = require("../middleware/permission");
const { saveLog } = require("../utils");

// Add new product
router.post(
  "/addnewproduct",
  permission,
  validatedProduct(validation),
  async (req, res) => {
    try {
      const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      });
      const addProduct = await newProduct.save();
      saveLog("POST", "/addnewproduct", 201, req.user?.email);
      res.status(201).json({ status: 201, addProduct });
    } catch (err) {
      saveLog("POST", "/addnewproduct", 500, req.user?.email);
      res.status(500).json({ status: 500, message: err.message });
    }
  }
);

// Get all products
router.get("/getproducts", async (req, res) => {
  try {
    const products = await Product.find();
    saveLog("GET", "/getproducts", 200, req.user?.email);
    res.status(200).json({ status: 200, products });
  } catch (err) {
    saveLog("GET", "/getproducts", 500, req.user?.email);
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Update product by ID
router.put("/updateproduct/:id", permission, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      saveLog("PUT", `/updateproduct/${productId}`, 404, req.user?.email);
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }
    saveLog("PUT", `/updateproduct/${productId}`, 200, req.user?.email);
    res.status(200).json({ status: 200, product });
  } catch (err) {
    saveLog("PUT", `/updateproduct/${req.params.id}`, 500, req.user?.email);
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Delete product by ID
router.delete("/deleteproduct/:id", permission, async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      saveLog("DELETE", `/deleteproduct/${productId}`, 404, req.user?.email);
      return res
        .status(404)
        .json({ status: 404, message: "Product not found" });
    }
    saveLog("DELETE", `/deleteproduct/${productId}`, 200, req.user?.email);
    res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (err) {
    saveLog("DELETE", `/deleteproduct/${req.params.id}`, 500, req.user?.email);
    res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = router;
