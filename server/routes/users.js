var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const likeController = require('../controllers/likeController');

router.get('/currentUser', authController.currentUser);
router.post('/express-signup', authController.signup);
router.post('/express-login', authController.login);
router.get('/express-logout', authController.logout);

router.post('/firebase-blog', blogController.addBlog);
router.get('/firebase-blog/:id', blogController.getBlog);
router.post('/update', blogController.updateBlog)
router.post('/delete', blogController.deleteBlog);
router.get('/userBlogs', blogController.getUserBlogs);
router.get('/all', blogController.getAllBlogs);

router.post('/getliked', likeController.getLiked);
router.post('/like', likeController.like);
router.post('/unlike', likeController.unlike);

module.exports = router;
