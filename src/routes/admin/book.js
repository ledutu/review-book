var express = require('express');
var router = express.Router();

//import controller
const BookController = require('../../controllers/admin/BookController');

// get home
router.get('/', BookController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;