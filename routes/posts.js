const router = require('express').Router();
const {
  titleValidator,
  contentValidator,
  checkValidation,
} = require('../lib/inputValidators');
const {
  getPosts,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
} = require('../controllers/postsController');
const { isAdmin } = require('../middleware/authMiddleware');

router.get('/', getPosts);
router.get('/:postId', getSinglePost);
router.post('/', titleValidator, contentValidator, checkValidation, createPost);
router.put(
  '/:postId',
  isAdmin,
  titleValidator,
  contentValidator,
  checkValidation,
  editPost
);
router.delete('/:postId', isAdmin, deletePost);

module.exports = router;
