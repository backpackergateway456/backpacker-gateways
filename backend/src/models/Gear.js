const mongoose = require("mongoose");

const gearSchema = new mongoose.Schema(
  {
    // ==============================
    // BASIC PRODUCT INFORMATION
    // ==============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    detail: {
      type: String,
      default: "",
      trim: true,
    },

    // ==============================
    // RENTAL
    // ==============================
    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerWeek: {
      type: Number,
      default: 0,
      min: 0,
    },

    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },

    // ==============================
    // TREKKING SPECIFICATIONS
    // ==============================
    weight: {
      type: Number,
      default: 0,
      min: 0,
    },

    weightUnit: {
      type: String,
      enum: ["g", "kg"],
      default: "g",
    },

    temperatureRating: {
      type: Number,
      default: null,
    },

    bestFor: [
      {
        type: String,
        trim: true,
      },
    ],

    seasons: [
      {
        type: String,
        trim: true,
      },
    ],

    // ==============================
    // FEATURES
    // ==============================
    features: [
      {
        type: String,
        trim: true,
      },
    ],

    waterproof: {
      type: Boolean,
      default: false,
    },

    windproof: {
      type: Boolean,
      default: false,
    },

    insulated: {
      type: Boolean,
      default: false,
    },

    ultralight: {
      type: Boolean,
      default: false,
    },

    quickDrying: {
      type: Boolean,
      default: false,
    },

    // ==============================
    // PRODUCT INFORMATION
    // ==============================
    brand: {
      type: String,
      default: "",
      trim: true,
    },

    size: {
      type: String,
      default: "",
      trim: true,
    },

    gender: {
      type: String,
      default: "Unisex",
      trim: true,
    },

    color: {
      type: String,
      default: "",
      trim: true,
    },

    // ==============================
    // IMAGES
    // ==============================
    image: {
      type: String,
      required: true,
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    // ==============================
    // STATUS
    // ==============================
    popular: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    available: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    // ==============================
    // REVIEWS
    // ==============================
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gear", gearSchema);