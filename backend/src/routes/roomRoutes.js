const express = require("express");

const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const router = express.Router();

// =====================================================
// GET /api/rooms/search
// SEARCH ROOMS
// =====================================================
// Query parameters:
// ?destination=Kathmandu
// ?guests=2
// ?checkIn=2026-09-01
// ?checkOut=2026-09-05
//
// Example:
// GET http://localhost:5000/api/rooms/search?destination=Kathmandu&guests=2
// =====================================================

router.get("/search", getRooms);

// =====================================================
// GET /api/rooms
// GET ALL / FILTER ROOMS
// =====================================================
//
// Example:
// GET http://localhost:5000/api/rooms
//
// With filters:
// GET /api/rooms?destination=Kathmandu&guests=2
// =====================================================

router.get("/", getRooms);

// =====================================================
// GET /api/rooms/:id
// GET SINGLE ROOM
// =====================================================

router.get("/:id", getRoom);

// =====================================================
// POST /api/rooms
// CREATE NEW ROOM
// =====================================================

router.post("/", createRoom);

// =====================================================
// PUT /api/rooms/:id
// UPDATE EXISTING ROOM
// =====================================================

router.put("/:id", updateRoom);

// =====================================================
// DELETE /api/rooms/:id
// DELETE EXISTING ROOM
// =====================================================

router.delete("/:id", deleteRoom);

module.exports = router;