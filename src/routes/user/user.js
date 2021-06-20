var express = require('express');
var router = express.Router();
var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

//import controller
const UserController = require('../../controllers/user/UserController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.use(isAuthenticate);

// get home
router.get('/profile/*-:id', UserController.getUserProfile);
router.get('/book-favorite/*-:id', UserController.getUserBookFavorite);
router.get('/writer-favorite/*-:id', UserController.getUserWriterFavorite);
router.get('/my-review/*-:id', UserController.getUserMyReview);

module.exports = router;