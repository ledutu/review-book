var express = require('express');
var router = express.Router();

//import controller
const HomeController = require('../../controllers/admin/HomeController');
const HistoryController = require('../../controllers/admin/HistoryController');
const BookController = require('../../controllers/admin/BookController');
const BookCategoryController = require('../../controllers/admin/BookCategoryController');
const BlogController = require('../../controllers/admin/BlogController');
const BannerController = require('../../controllers/admin/BannerController');
const BannerCategoryController = require('../../controllers/admin/BannerCategoryController');
const UserController = require('../../controllers/admin/UserController');
const ReviewController = require('../../controllers/admin/ReviewController');


// get home

router.get('/', HomeController.index);

router.get('/user', UserController.index);

router.get('/history', HistoryController.index);

router.get('/book', BookController.index);

router.get('/book-category', BookCategoryController.index);

router.get('/blog', BlogController.index);

router.get('/banner', BannerController.index);

router.get('/banner-category', BannerCategoryController.index);

router.get('/review', ReviewController.index);

module.exports = router;