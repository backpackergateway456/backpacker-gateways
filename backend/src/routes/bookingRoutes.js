const express = require("express");

const {
  createBooking,
  getBookings,
} = require("../controllers/bookingController");

const router = express.Router();

// Create new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getBookings);

module.exports = router;