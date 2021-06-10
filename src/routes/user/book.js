var express = require('express');
var router = express.Router();

//import controller
const BookController = require('../../controllers/user/BookController');

// get book
router.get('/category/:id', BookController.index);
router.get('/*-:id', BookController.getBookDetail);

module.exports = router;