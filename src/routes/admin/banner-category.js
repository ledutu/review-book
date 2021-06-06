var express = require('express');
var router = express.Router();

//import controller
const BannerCategoryController = require('../../controllers/admin/BannerCategoryController');

// get home
router.get('/', BannerCategoryController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;