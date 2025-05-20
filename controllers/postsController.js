const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const { logger } = require('../config/logger');

// @desc    Read all posts
// @route   GET /posts
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  logger.info('Fetched all posts');
  return res.status(200).json({ posts });
});

// @desc    Read a single post
// @route   GET /posts/:postId
// @access  Private
const getSinglePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    logger.warn(`No post found with id ${req.params.postId}`);
    const error = new Error('No post found');
    error.statusCode = 404;
    return next(error);
  }

  logger.info(`Fetched post with id ${req.params.postId}`);
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

  logger.info(`Post created`, {
    title: post.title,
    postId: post._id,
    authorId: post.author,
  });

  return res.status(201).json({ post });
});

// @desc    Edit post
// @route   PUT /posts/:postId/edit
// @access  Private
const editPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    logger.warn(`Post not found with id ${req.params.postId}`);
    const error = new Error('Post not found');
    error.statusCode = 404;
    return next(error);
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
    logger.warn(
      `Post no longer exists (possibly deleted) with id ${req.params.postId}`
    );
    const error = new Error('Post no longer exists, possibly deleted');
    error.statusCode = 404;
    return next(error);
  }

  logger.info(`Post updated with id ${req.params.postId}`);
  return res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /posts/:postId
// @access  Private
const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    logger.warn(`Post not found for deletion with id ${req.params.postId}`);
    const error = new Error('Post not found');
    error.statusCode = 404;
    return next(error);
  }

  await post.deleteOne();

  logger.info(`Post deleted with id ${req.params.postId}`);
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
