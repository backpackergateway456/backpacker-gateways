const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "Travel",
    },

    author: {
      type: String,
      default: "Backpacker Gateways",
    },

    location: {
      type: String,
      default: "Nepal",
    },

    image: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CommunityPost",
  communityPostSchema
);