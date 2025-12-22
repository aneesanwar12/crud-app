const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User don't exist" });
  }

  const isValid = password === user.password;
  if (!isValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      permission: user.permission,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
