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
const {getCreateUser,postCreateUser} = require('../../controllers/admin/CreateUserController');
const CreateBookController = require('../../controllers/admin/CreateBookController')
const CreateBookCategoryController = require('../../controllers/admin/CreateBookCategoryController')
const CreateBannerController = require('../../controllers/admin/CreateBannerController')
const CreateBannerCategoryController = require('../../controllers/admin/CreateBannerCategoryController')
// get home

router.get('/', HomeController.index);


router.get('/user', UserController.show);
router.get('/user/:id',UserController.edit)
router.put('/user/:id',UserController.update)
router.delete('/user/:id',UserController.destroy)

router.get('/create-user',getCreateUser)
router.post('/create-user',postCreateUser)

router.get('/history', HistoryController.index);

router.get('/book', BookController.show);
router.get('/book/:id', BookController.edit);
router.put('/book/:id', BookController.update);

router.get('/create-book',CreateBookController.index)

router.get('/book-category', BookCategoryController.index);

router.get('/create-book-category',CreateBookCategoryController.index)

router.get('/blog', BlogController.index);

router.get('/banner', BannerController.index);

router.get('/create-banner',CreateBannerController.index)

router.get('/banner-category', BannerCategoryController.index);

router.get('/create-banner-category',CreateBannerCategoryController.index)


router.get('/review', ReviewController.index);



module.exports = router;