var express = require('express');
var router = express.Router();

//import controller
const UserController = require('../../controllers/admin/UserController');

// get home
router.get('/', UserController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;