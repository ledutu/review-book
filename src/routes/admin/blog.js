var express = require('express');
var router = express.Router();

//import controller
const BlogController = require('../../controllers/admin/BlogController');

// get home
router.get('/', BlogController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;