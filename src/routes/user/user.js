var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//import controller
const UserController = require('../../controllers/user/UserController');

// get home
router.get('/profile/*-:id', UserController.getUserProfile);
router.get('/book-favorite/*-:id', UserController.getUserBookFavorite);
router.get('/writer-favorite/*-:id', UserController.getUserWriterFavorite);
router.get('/my-review/*-:id', UserController.getUserMyReview);

router.post('/login', UserController.postLogin);
router.post('/sign-up', UserController.postSignUp);

module.exports = router;