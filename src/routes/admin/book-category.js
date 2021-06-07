var express = require('express');
var router = express.Router();

//import controller
const BookCategoryController = require('../../controllers/admin/BookCategoryController');

// get home
router.get('/', BookCategoryController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;