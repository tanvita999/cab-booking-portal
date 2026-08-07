const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

// Create Booking
router.post("/", verifyToken, createBooking);

// Get All Bookings
router.get("/", verifyToken, getAllBookings);

// Get Booking By ID
router.get("/:id", verifyToken, getBookingById);

// Update Booking
router.put("/:id", verifyToken, updateBooking);

// Delete Booking
router.delete("/:id", verifyToken, deleteBooking);

module.exports = router;
