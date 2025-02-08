const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { issueJWT } = require('../lib/issueJWT');

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    isAdmin: false,
  });

  if (!user) {
    res.status(400).json({ message: 'User registration failed' });
  }

  const tokenData = issueJWT(user);

  return res.status(201).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token: tokenData.token,
    expiresIn: tokenData.expiresIn,
  });
});

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'No user exists with that email' });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return res
      .status(401)
      .json({ message: 'Incorrect password, please try again' });
  }

  const tokenData = issueJWT(user);

  return res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token: tokenData.token,
    expiresIn: tokenData.expiresIn,
  });
});

// @desc    Get user profile
// @route   GET /profile
// @access  Private
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.user._id, '-password');

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  return res.status(200).json({ user });
});

// @desc    Edit user profile
// @route   PUT /profile
// @access  Private
const editProfile = asyncHandler(async (req, res) => {});

// @desc    Delete user profile
// @route   DELETE /profile
// @access  Private
const deleteProfile = asyncHandler(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
};
