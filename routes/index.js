const router = require('express').Router();
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const postsRoutes = require('./posts');
const { isAuth } = require('../middleware/authMiddleware');

router.use('/auth', authRoutes);
router.use('/users', isAuth, usersRoutes);
router.use('/users', isAuth, postsRoutes);

module.exports = router;
