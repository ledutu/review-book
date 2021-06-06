var express = require('express');
var router = express.Router();

//import controller
const ReviewController = require('../../controllers/admin/ReviewController');

// get home
router.get('/', ReviewController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;