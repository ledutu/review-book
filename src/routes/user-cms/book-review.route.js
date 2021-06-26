var express = require('express');
var router = express.Router();
var BookReviewController = require('../../controllers/user-cms/book-review.controller');
var FILE = require('../../middlewares/user/file.middleware');

/* GET home page. */
router.get('/', BookReviewController.index);
router.delete('/', BookReviewController.deleteBookReview);
router.get('/create', BookReviewController.getCreate);
router.post('/create', FILE.uploadBookReviewImageTitleMiddleware, BookReviewController.postCreate);

module.exports = router;
