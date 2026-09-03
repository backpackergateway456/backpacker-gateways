const express = require("express");

const router = express.Router();

const {
createPost,
getPosts,
getPostById,
updatePost,
deletePost,
} = require("../controllers/communityController");

// GET ALL POSTS
router.get("/", getPosts);

// GET SINGLE POST
router.get("/:id", getPostById);

// CREATE NEW POST
router.post("/", createPost);

// UPDATE POST
router.put("/:id", updatePost);

// DELETE POST
router.delete("/:id", deletePost);

module.exports = router;
