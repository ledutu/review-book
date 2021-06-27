var express = require('express');
var router = express.Router();
var BookReviewController = require('../../controllers/user-cms/book-review.controller');
var FILE = require('../../middlewares/user/file.middleware');
var { isLoginApi } = require('../../middlewares/user/auth.middleware');

/* GET home page. */
router.get('/', BookReviewController.index);
router.delete('/', isLoginApi, BookReviewController.deleteBookReview);
router.put('/', isLoginApi, BookReviewController.hideBookReview);

router.get('/create', BookReviewController.getCreate);
router.post('/create', FILE.uploadBookReviewImageTitleMiddleware, BookReviewController.postCreate);
router.post('/update', FILE.uploadBookReviewImageTitleMiddleware, BookReviewController.postUpdate);

module.exports = router;
