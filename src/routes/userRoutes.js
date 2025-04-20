const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Assuming you have auth middleware
const User = require("../models/User"); // Assuming you have a User model

// Get user info
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update user info
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, email, profilePicture } },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
