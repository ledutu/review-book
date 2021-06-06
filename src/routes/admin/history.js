var express = require('express');
var router = express.Router();

//import controller
const HistoryController = require('../../controllers/admin/HistoryController');

// get home
router.get('/', HistoryController.index);
// router.get('/language/:lang', HomeController.changeLanguage);

module.exports = router;