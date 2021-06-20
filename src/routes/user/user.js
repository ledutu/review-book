var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');
var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

//import controller
const UserController = require('../../controllers/user/UserController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.post('/login', UserController.postLogin);
router.post('/sign-up', UserController.postSignUp);
router.use(isAuthenticate)

// get home
router.get('/profile/*-:id', UserController.getUserProfile);
router.get('/book-favorite/*-:id', UserController.getUserBookFavorite);
router.get('/writer-favorite/*-:id', UserController.getUserWriterFavorite);
router.get('/my-review/*-:id', UserController.getUserMyReview);
router.get('/logout', UserController.logout);


module.exports = router;