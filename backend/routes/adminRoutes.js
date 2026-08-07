const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

router.get("/dashboard", verifyToken, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;
