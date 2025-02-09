const asyncHandler = require('express-async-handler');
const User = require('../models/user');

// @desc    Search users
// @route   GET /search
// @access  Private
const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
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
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password');
  return res.status(200).json({ users });
});

// @desc    Read a single user
// @route   GET /users/:userId
// @access  Private
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  return res.status(200).json({ user });
});

module.exports = {
  searchUsers,
  getUsers,
  getSingleUser,
};
