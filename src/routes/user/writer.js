var express = require('express');
var router = express.Router();

//import controller
const WriterController = require('../../controllers/user/WriterController');

// get home
router.get('/', WriterController.index);

module.exports = router;