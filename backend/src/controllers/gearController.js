const Gear = require("../models/Gear");

// GET ALL GEARS
const getGears = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      available,
      popular,
      featured,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Available
    if (available !== undefined) {
      query.available = available === "true";
    }

    // Popular
    if (popular !== undefined) {
      query.popular = popular === "true";
    }

    // Featured
    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    const gears = await Gear.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gears.length,
      gears,
    });
  } catch (error) {
    console.error("Get Gears Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get gears",
      error: error.message,
    });
  }
};


// GET SINGLE GEAR
const getGearById = async (req, res) => {
  try {
    const gear = await Gear.findById(req.params.id);

    if (!gear) {
      return res.status(404).json({
        success: false,
        message: "Gear not found",
      });
    }

    res.status(200).json({
      success: true,
      gear,
    });
  } catch (error) {
    console.error("Get Gear Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get gear",
      error: error.message,
    });
  }
};


// CREATE GEAR
const createGear = async (req, res) => {
  try {
    const gear = await Gear.create(req.body);

    res.status(201).json({
      success: true,
      message: "Gear created successfully",
      gear,
    });
  } catch (error) {
    console.error("Create Gear Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to create gear",
      error: error.message,
    });
  }
};


// UPDATE GEAR
const updateGear = async (req, res) => {
  try {
    const gear = await Gear.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!gear) {
      return res.status(404).json({
        success: false,
        message: "Gear not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gear updated successfully",
      gear,
    });
  } catch (error) {
    console.error("Update Gear Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to update gear",
      error: error.message,
    });
  }
};


// DELETE GEAR
const deleteGear = async (req, res) => {
  try {
    const gear = await Gear.findByIdAndDelete(req.params.id);

    if (!gear) {
      return res.status(404).json({
        success: false,
        message: "Gear not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gear deleted successfully",
    });
  } catch (error) {
    console.error("Delete Gear Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete gear",
      error: error.message,
    });
  }
};


module.exports = {
  getGears,
  getGearById,
  createGear,
  updateGear,
  deleteGear,
};