const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/authController");

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Test Route
router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;
