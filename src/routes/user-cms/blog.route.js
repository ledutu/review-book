var express = require('express');
var router = express.Router();
var BlogController = require('../../controllers/user-cms/blog.controller');
var FILE = require('../../middlewares/user/file.middleware');
var { isLoginApi } = require('../../middlewares/user/auth.middleware');

/* GET home page. */
router.get('/', BlogController.index);
router.put('/', isLoginApi, BlogController.hideBlog);
router.delete('/', isLoginApi, BlogController.deleteBlog);

router.get('/create', BlogController.getCreate);
router.post('/create', BlogController.postCreate);
router.post('/update', BlogController.postUpdate);

module.exports = router;
