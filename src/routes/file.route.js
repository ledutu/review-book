var express = require('express');
var router = express.Router();
var FileController = require('../controllers/file.controller');
var FILE = require('../middlewares/user/file.middleware');

/* GET home page. */
router.post('/upload-blog-image', FILE.uploadBlogMiddleware, FileController.uploadBlogImage);

module.exports = router;
