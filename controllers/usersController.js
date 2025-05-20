const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const logger = require('../config/logger');

// @desc    Search users
// @route   GET /search
// @access  Private
const searchUsers = asyncHandler(async (req, res, next) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!query) {
    const error = new Error('Search query is required');
    error.statusCode = 400;
    return next(error);
  }

  const users = await User.find(
    {
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    },
    '-password'
  )
    .sort({ lastName: 'asc', firstName: 'asc' })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({ users });
});

// @desc    Read all users
// @route   GET /users
// @access  Private
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, '-password');
  res.status(200).json({ users });
});

// @desc    Read a single user
// @route   GET /users/:userId
// @access  Private
const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select('-password');

  if (!user) {
    logger.warn(`User not found with id ${req.params.userId}`);
    const error = new Error('No user found');
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ user });
});

module.exports = {
  searchUsers,
  getUsers,
  getSingleUser,
};
