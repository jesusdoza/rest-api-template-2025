const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

// @desc    Read all posts
// @route   GET /posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  return res.status(200).json({ posts });
});

// @desc    Read a single post
// @route   GET /posts/:postId
// @access  Private
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: 'No post found' });
  }

  return res.status(200).json({ post });
});

// @desc    Create a new post
// @route   POST /posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    author: req.user._id,
    title: req.body.title,
    content: req.body.content,
    timestamp: Date.now(),
  });

  return res.status(201).json({ post });
});

// @desc    Edit post
// @route   PUT /posts/:postId/edit
// @access  Private
const editPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPost) {
    return res
      .status(404)
      .json({ message: 'Post no longer exists, possibly deleted' });
  }

  return res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /posts/:postId
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  await post.deleteOne();

  return res.status(200).json({
    message: `post ${req.params.postId} deleted`,
  });
});

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
};
