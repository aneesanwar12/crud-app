const express = require("express");
const router = express();
const User = require("../models/userModal");
const { validatedUser, validation } = require("../validation/userValidation");
const { saveLog } = require("../utils");

// Add new user
router.post("/addnewuser", validatedUser(validation), async (req, res) => {
  try {
    const existedMail = await User.findOne({ email: req.body.email });
    if (existedMail) {
      saveLog("POST", "/addnewuser", 409);
      return res
        .status(409)
        .json({ status: 409, message: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
    });

    const addUser = await newUser.save();
    saveLog("POST", "/addnewuser", 201);
    res.status(201).json({ status: 201, addUser });
  } catch (err) {
    saveLog("POST", "/addnewuser", 500);
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Get all users
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    saveLog("GET", "/getusers", 200);
    res.status(200).json({ status: 200, users });
  } catch (err) {
    saveLog("GET", "/getusers", 500);
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Update user by ID
router.put("/updateuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      saveLog("PUT", `/updateuser/${userId}`, 404);
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    saveLog("PUT", `/updateuser/${userId}`, 200);
    res.status(200).json({ status: 200, user });
  } catch (err) {
    saveLog("PUT", `/updateuser/${req.params.id}`, 500);
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      saveLog("DELETE", `/deleteuser/${userId}`, 404);
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    saveLog("DELETE", `/deleteuser/${userId}`, 200);
    res.status(200).json({ status: 200, message: "User deleted successfully" });
  } catch (err) {
    saveLog("DELETE", `/deleteuser/${req.params.id}`, 500);
    res.status(500).json({ status: 500, message: err.message });
  }
});

module.exports = router;
