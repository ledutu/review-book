var express = require('express');
var router = express.Router();

//import controller
const WriterController = require('../../controllers/user/WriterController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.use(isAuthenticate);

// get home
router.get('/', WriterController.index);

module.exports = router;