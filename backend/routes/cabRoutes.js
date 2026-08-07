const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createCab,
  getAllCabs,
  getCabById,
  updateCab,
  deleteCab,
} = require("../controllers/cabController");

// Create Cab
router.post("/", verifyToken, authorize("admin"), createCab);

// Get All Cabs
router.get("/", verifyToken, authorize("admin"), getAllCabs);

// Get Cab By ID
router.get("/:id", verifyToken, authorize("admin"), getCabById);

// Update Cab
router.put("/:id", verifyToken, authorize("admin"), updateCab);

// Delete Cab
router.delete("/:id", verifyToken, authorize("admin"), deleteCab);

module.exports = router;
