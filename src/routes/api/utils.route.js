var express = require('express');
var router = express.Router();
const UtilsController = require('../../controllers/api/utils.controller');

/* GET home page. */
router.get('/delete-message-session', UtilsController.deleteMessageSession);

module.exports = router;
