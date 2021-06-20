var express = require('express');
var router = express.Router();

//import controller
const HomeController = require('../../controllers/user/HomeController');
var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.use(isAuthenticate);

// get home
router.get('/', HomeController.index);
router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;