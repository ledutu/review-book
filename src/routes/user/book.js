var express = require('express');
var router = express.Router();

//import controller
const BookController = require('../../controllers/user/BookController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.use(isAuthenticate);

// get book
router.get('/category', BookController.index);
router.get('/*-:id', BookController.getBookDetail);
router.get('/add-to-favourite/:id', BookController.addToBookFavourite);
router.get('/rate-book-review/:id', BookController.rateBookReview);
// router.post('/rate-book-review/:id', BookController.rateBookReview);


module.exports = router;