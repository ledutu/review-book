var express = require('express');
var router = express.Router();
var DashboardController = require('../../controllers/user-cms/dashboard.controller');

/* GET home page. */
router.get('/', DashboardController.index);
router.get('/logout', DashboardController.logout);

module.exports = router;
