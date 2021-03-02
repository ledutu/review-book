var express = require('express');
var router = express.Router();

//import controller
const UserController = require('../../controllers/user/UserController');

// get home
router.get('/profile', UserController.getUserProfile);
router.get('/book-favorite', UserController.getUserBookFavorite);
router.get('/writer-favorite', UserController.getUserWriterFavorite);

module.exports = router;