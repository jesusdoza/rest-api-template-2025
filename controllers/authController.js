const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { issueJWT } = require('../lib/issueJWT');
const { logger } = require('../config/logger');

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  logger.info('Attempting to register user', { firstName, lastName, email });

  const userExists = await User.findOne({ email });

  if (userExists) {
    logger.warn(
      `${firstName} ${lastName} is already registered with email ${email}`
    );
    const error = new Error('User already exists');
    error.statusCode = 400;
    return next(error);
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
    logger.error(`Registration failed for ${firstName} ${lastName}`);
    const error = new Error('User registration failed');
    error.statusCode = 400;
    return next(error);
  }

  const tokenData = issueJWT(user);

  logger.info(`${firstName} ${lastName} has been successfully registered`);

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
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  logger.info(`Attempting to login user with ${email}...`);

  const user = await User.findOne({ email });

  if (!user) {
    logger.warn(`No user exists with email ${email}`);
    const error = new Error('No user exists with that email');
    error.statusCode = 404;
    return next(error);
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    logger.warn(`Incorrect password for user ${email}`);
    const error = new Error('Incorrect password, please try again');
    error.statusCode = 401;
    return next(error);
  }

  const tokenData = issueJWT(user);

  logger.info(`${user.firstName} ${user.lastName} has been logged in`);

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
const userProfile = asyncHandler(async (req, res, next) => {
  logger.info(`Attempting to find user with id ${req.body.user._id}`);
  const user = await User.findById(req.body.user._id, '-password');

  if (!user) {
    logger.warn(`No user found with id ${req.body.user._id}`);
    const error = new Error('No user found');
    error.statusCode = 404;
    return next(error);
  }

  logger.info(`User found`, user);
  return res.status(200).json({ user });
});

// @desc    Edit user profile
// @route   PUT /profile
// @access  Private
const editProfile = asyncHandler(async (req, res, next) => {});

// @desc    Delete user profile
// @route   DELETE /profile
// @access  Private
const deleteProfile = asyncHandler(async (req, res, next) => {});

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
};
