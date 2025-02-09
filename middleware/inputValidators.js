const { body, param, validationResult } = require('express-validator');

const firstNameValidator = body('firstName')
  .trim()
  .notEmpty()
  .escape()
  .withMessage('Please include a first name.');

const lastNameValidator = body('lastName')
  .trim()
  .notEmpty()
  .escape()
  .withMessage('Please include a last name.');

const emailValidator = body('email')
  .trim()
  .notEmpty()
  .isEmail()
  .withMessage('Please include a valid email.')
  .escape();

const passwordValidator = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters.');

const titleValidator = body('title')
  .trim()
  .notEmpty()
  .withMessage('Please include content.');

const contentValidator = body('content')
  .notEmpty()
  .withMessage('Please include content.');

const postIdValidator = param('postId')
  .isMongoId()
  .withMessage('Invalid post ID');

const userIdValidator = param('userId')
  .isMongoId()
  .withMessage('Invalid user ID');

const checkValidations = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  return next();
};

module.exports = {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  titleValidator,
  contentValidator,
  postIdValidator,
  userIdValidator,
  checkValidations,
};
