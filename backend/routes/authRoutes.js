const express = require("express");

const router = express.Router();

const { register } = require("../controllers/authController");

// Register Route
router.post("/register", register);

// Test Route
router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;
