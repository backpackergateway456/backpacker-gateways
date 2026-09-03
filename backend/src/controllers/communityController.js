const CommunityPost = require("../models/CommunityPost");

// CREATE A NEW POST
const createPost = async (req, res) => {
  try {
    const {
      title,
      category,
      author,
      location,
      image,
      content,
      featured,
    } = req.body;

    const post = await CommunityPost.create({
      title,
      category,
      author,
      location,
      image,
      content,
      featured,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get posts",
      error: error.message,
    });
  }
};

// GET SINGLE POST
const getPostById = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get post",
      error: error.message,
    });
  }
};

// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findByIdAndDelete(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};