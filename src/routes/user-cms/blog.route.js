var express = require('express');
var router = express.Router();
var BlogController = require('../../controllers/user-cms/blog.controller');

/* GET home page. */
router.get('/', BlogController.index);

module.exports = router;
