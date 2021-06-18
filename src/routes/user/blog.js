var express = require('express');
var router = express.Router();

//import controller
const BlogController = require('../../controllers/user/BlogController');

// get book
router.get('/', BlogController.index);
router.get('/*-:id', BlogController.getBlogDetail);

module.exports = router;