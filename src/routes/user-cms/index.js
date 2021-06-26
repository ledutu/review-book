var express = require('express');
var router = express.Router();
var dashboard = require('./dashboard.route');
var bookReview = require('./book-review.route');
var blog = require('./blog.route');
const { isLogin } = require('../../middlewares/user/auth.middleware');

router.use(isLogin);
router.use('/dashboard', dashboard);
router.use('/book-review', bookReview);
router.use('/blog', blog);

module.exports = router;
