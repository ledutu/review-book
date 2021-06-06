var express = require('express');
var router = express.Router();

//import controller
const CategoryController = require('../../controllers/admin/CategoryController');

// get home
router.get('/', CategoryController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;