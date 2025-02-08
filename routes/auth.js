const router = require('express').Router();
const {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
} = require('../controllers/authController');
const {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
} = require('../middleware/inputValidators');
const { isAuth } = require('../middleware/authMiddleware');

router.post(
  '/register',
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  registerUser
);
router.post(
  '/login',
  emailValidator,
  passwordValidator,
  checkValidations,
  loginUser
);
router.get('/profile', isAuth, userProfile);
router.put(
  '/profile',
  isAuth,
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  checkValidations,
  editProfile
);
router.delete('/profile', isAuth, deleteProfile);

module.exports = router;
