var express = require('express');
var router = express.Router();

//import controller
const HomeController = require('../../controllers/admin/home.controller');
const HistoryController = require('../../controllers/admin/history.controller');
const BookController = require('../../controllers/admin/book.controller');
const BookCategoryController = require('../../controllers/admin/book-category.controller');
const BlogController = require('../../controllers/admin/blog.controller');
const BannerController = require('../../controllers/admin/banner.controller');
const BannerCategoryController = require('../../controllers/admin/banner-category.controller');
const UserController = require('../../controllers/admin/user.controller');
const ReviewController = require('../../controllers/admin/review.controller');
const AuthController = require('../../controllers/admin/auth.controller')
router.get('/login',AuthController.getLoginPage)
router.post('/login',AuthController.postLogin)
// get home
router.get('/',HomeController.index);

//user
router.get('/user', UserController.show);
router.get('/user/:id',UserController.edit)
router.put('/user/:id',UserController.update)
router.delete('/user/:id',UserController.destroy)

//review
router.get('/review', ReviewController.show);
router.put('/review/:id', ReviewController.update);
router.get('/review/:id',ReviewController.detail)


router.get('/book', BookController.show);
router.get('/book/:id', BookController.edit);
router.put('/book/:id', BookController.update);

//book-category
router.get('/book-category', BookCategoryController.show);
router.get('/book-category/create', BookCategoryController.create);

//blog
router.get('/blog', BlogController.show);
router.put('/blog/:id',BlogController.update)
router.get('/blog-tags',BlogController.getBlogTags)


//banner
router.get('/banner', BannerController.show);
router.get('/banner/create', BannerController.create);

//banner-category
router.get('/banner-category', BannerCategoryController.show);
router.get('/banner-category/create', BannerCategoryController.create);

//history
router.get('/history', HistoryController.index);



module.exports = router;