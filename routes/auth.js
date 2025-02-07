const router = require('express').Router();
const {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
} = require('../controllers/authController');
const { isAuth } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuth, userProfile);
router.put('/profile', isAuth, editProfile);
router.delete('/profile', isAuth, deleteProfile);

module.exports = router;
