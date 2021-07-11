var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/api/user.controller');

//Book Detail
router.get('/delete-comment-review/:id', UserController.deleteCommentReview);
router.put('/edit-comment-review/:id', UserController.editCommentReview);
router.get('/rate-review', UserController.rateReview);
router.post('/comment-review', UserController.postCommentReview);

//Blog
router.get('/delete-comment-blog/:id', UserController.deleteCommentBlog);
router.get('/rate-blog', UserController.rateBlog);
router.post('/comment-blog', UserController.postCommentBlog);
router.put('/edit-comment-blog/:id', UserController.editCommentBlog);

module.exports = router;
