var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/api/user.controller');

//Book Detail
router.get('/delete-comment-review/:id', UserController.deleteCommentReview);
router.get('/rate-review', UserController.rateReview);
router.post('/comment-review', UserController.postCommentReview);

//Blog
router.get('/delete-comment-blog/:id', UserController.deleteCommentBlog);
router.get('/rate-blog', UserController.rateBlog);
router.post('/comment-blog', UserController.postCommentBlog);

module.exports = router;
