var express = require('express');
var router = express.Router();
var utils = require('./utils.route');
var user = require('./user.route');

router.use('/util', utils);
router.use('/user', user);

module.exports = router;
