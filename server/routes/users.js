var express = require('express');
var router = express.Router();

const validate = require('../middleware/validateUser');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');
const likeController = require('../controllers/likeController');

router.get('/currentUser', authController.currentUser);
router.post('/express-signup', authController.signup);
router.post('/express-login', authController.login);
router.get('/express-logout', validate, authController.logout);

router.post('/firebase-blog', validate, blogController.addBlog);
router.get('/firebase-blog/:id', validate, blogController.getBlog);
router.post('/update', validate, blogController.updateBlog)
router.post('/delete', validate, blogController.deleteBlog);
router.get('/userBlogs', validate, blogController.getUserBlogs);
router.get('/all', validate, blogController.getAllBlogs);

router.post('/getliked', validate, likeController.getLiked);
router.post('/like', validate, likeController.like);
router.post('/unlike', validate, likeController.unlike);

module.exports = router;
