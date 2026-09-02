const express = require("express");
const router = express.Router();

const {
  getGears,
  getGearById,
  createGear,
  updateGear,
  deleteGear,
} = require("../controllers/gearController");

// GET all gears
router.get("/", getGears);

// GET single gear
router.get("/:id", getGearById);

// CREATE gear
router.post("/", createGear);

// UPDATE gear
router.put("/:id", updateGear);

// DELETE gear
router.delete("/:id", deleteGear);

module.exports = router;