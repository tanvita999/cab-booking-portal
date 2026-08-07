const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

// Get Logged-in User
router.get("/profile", verifyToken, getProfile);

// Update Profile
router.put("/profile", verifyToken, updateProfile);

// Change Password
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
