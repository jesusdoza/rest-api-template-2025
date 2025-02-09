const router = require('express').Router();
const { userIdValidator, checkValidations } = require('../lib/inputValidators');
const {
  searchUsers,
  getUsers,
  getSingleUser,
} = require('../controllers/userController');

router.get('/search', searchUsers);
router.get('/', getUsers);
router.get('/:userId', userIdValidator, checkValidations, getSingleUser);

module.exports = router;
