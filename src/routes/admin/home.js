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

//user
router.get('/user', UserController.show);
router.get('/user/:id',UserController.edit)
router.put('/user/:id',UserController.update)
router.delete('/user/:id',UserController.destroy)

//review
router.get('/review', ReviewController.show);
router.put('/review/:id', ReviewController.update);



router.get('/book', BookController.show);
router.get('/book/:id', BookController.edit);
router.put('/book/:id', BookController.update);

//book-category
router.get('/book-category', BookCategoryController.show);
router.get('/book-category/create', BookCategoryController.create);

//blog
router.get('/blog', BlogController.show);
router.put('/blog/:id',BlogController.update)

//banner
router.get('/banner', BannerController.show);
router.get('/banner/create', BannerController.create);

//banner-category
router.get('/banner-category', BannerCategoryController.show);
router.get('/banner-category/create', BannerCategoryController.create);

//history
router.get('/history', HistoryController.index);



module.exports = router;