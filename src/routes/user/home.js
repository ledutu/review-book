var express = require('express');
var router = express.Router();

//import controller
const HomeController = require('../../controllers/user/HomeController');

// get home
router.get('/', HomeController.index);
router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;