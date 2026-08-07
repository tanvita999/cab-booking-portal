const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

// ================= CREATE DRIVER =================
router.post("/", verifyToken, authorize("admin"), createDriver);

// ================= GET ALL DRIVERS =================
router.get("/", verifyToken, authorize("admin"), getAllDrivers);

// ================= GET DRIVER BY ID =================
router.get("/:id", verifyToken, authorize("admin"), getDriverById);

// ================= UPDATE DRIVER =================
router.put("/:id", verifyToken, authorize("admin"), updateDriver);

// ================= DELETE DRIVER =================
router.delete("/:id", verifyToken, authorize("admin"), deleteDriver);

module.exports = router;
