const express = require("express");
const router = express();
const User = require("../model/userModal")
const { validatedUser, validation } = require("../validation/userValidation")

// Add new user
router.post("/addnewuser", validatedUser(validation), async (req, res) => {
  try {
    const existedMail = await User.findOne({ email: req.body.email });
    if (existedMail) {
      return res.status(409).json({ status: 409, message: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });

    const addUser = await newUser.save();
    res.status(201).json({ status: 201, addUser });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Get all users
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 200, users });
  } catch (err) {
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
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.status(200).json({ status: 200, user });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    res.status(200).json({ status: 200, message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});



module.exports = router