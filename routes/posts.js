const router = require('express').Router();
const { titleValidator, contentValidator } = require('../lib/inputValidators');
const {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  updateSinglePost,
  deleteSinglePost,
} = require('../controllers/postsController');
const { isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllPosts);
router.get('/:postId', getSinglePost);
router.post('/', titleValidator, contentValidator, submitNewPost);
router.put('/:postId', isAdmin, updateSinglePost);
router.delete('/:postId', isAdmin, deleteSinglePost);

module.exports = router;
