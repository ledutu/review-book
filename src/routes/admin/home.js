var express = require('express');
var router = express.Router();

//import controller
const HomeController = require('../../controllers/admin/home.controller');
const HistoryController = require('../../controllers/admin/history.controller');
const BookController = require('../../controllers/admin/book.controller');
const ReviewCategoryController = require('../../controllers/admin/review-category.controller');
const BlogTagController = require('../../controllers/admin/blog-tag.controller');
const BlogController = require('../../controllers/admin/blog.controller');
const BannerController = require('../../controllers/admin/banner.controller');
const BannerCategoryController = require('../../controllers/admin/banner-category.controller');
const UserController = require('../../controllers/admin/user.controller');
const ReviewController = require('../../controllers/admin/review.controller');
const AuthController = require('../../controllers/admin/auth.controller')
const AdminController = require('../../controllers/admin/admin.controller')

var { isAdmin } = require('../../middlewares/admin/auth.middleware');

router.get('/login', AuthController.getLoginPage)
router.post('/login', AuthController.postLogin)

router.use(isAdmin);

// get home
router.get('/', HomeController.index);
router.get('/logout',HomeController.logout)
//user
router.get('/user', UserController.show);
router.get('/user/:id', UserController.edit)
router.put('/user/hideUser', UserController.hideUser)
router.put('/user/confirmRole', UserController.confirmRole)
router.delete('/user/:id', UserController.destroy)

//admin
router.get('/administrators',AdminController.show)
router.put('/administrators/hideUser', AdminController.hideUser)
router.put('/administrators/confirmRole', AdminController.confirmRole)
//review
router.get('/review', ReviewController.show);
router.put('/review/hideReview', ReviewController.hideReview);
router.put('/review/confirmReview', ReviewController.confirmReview);
router.get('/review/:id', ReviewController.detail)

//book-category
router.get('/review-category', ReviewCategoryController.show);
router.get('/review-category/create', ReviewCategoryController.getCreate);
router.post('/review-category/create', ReviewCategoryController.postCreate);
router.post('/review-category/update', ReviewCategoryController.postUpdate);
router.put('/review-category/hideCate', ReviewCategoryController.hideCate);

//blog
router.get('/blog', BlogController.show);
router.put('/blog/hideBlog', BlogController.hideBlog);
router.put('/blog/confirmBlog', BlogController.confirmBlog);
router.get('/blog/:id',BlogController.detail)

//blog-tag
router.get('/blog-tag', BlogTagController.show);
router.get('/blog-tag/create', BlogTagController.getCreate);
router.post('/blog-tag/create', BlogTagController.postCreate);
router.post('/blog-tag/update', BlogTagController.postUpdate);
router.put('/blog-tag/blockCate', BlogTagController.blockCate);

//banner
router.get('/banner', BannerController.show);
router.get('/banner/create', BannerController.create);

//banner-category
router.get('/banner-category', BannerCategoryController.show);
router.get('/banner-category/create', BannerCategoryController.create);

//history
router.get('/history', HistoryController.index);



module.exports = router;