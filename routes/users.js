const router = require('express').Router();
const {
  userIdValidator,
  checkValidations,
} = require('../middleware/inputValidators');
const {
  searchUsers,
  getUsers,
  getSingleUser,
} = require('../controllers/usersController');

router.get('/search', searchUsers);
router.get('/', getUsers);
router.get('/:userId', userIdValidator, checkValidations, getSingleUser);

module.exports = router;
