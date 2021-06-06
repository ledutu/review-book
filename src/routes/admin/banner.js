var express = require('express');
var router = express.Router();

//import controller
const BannerController = require('../../controllers/admin/BannerController');

// get home
router.get('/', BannerController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;