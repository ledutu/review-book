var express = require('express');
var router = express.Router();

//import controller
const BlogController = require('../../controllers/user/BlogController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

// get book
router.use(isAuthenticate);
router.get('/', BlogController.index);
router.get('/*-:id', BlogController.getBlogDetail);

router.get('/test', function(request, response) {
    request.session.message = {
        title: 'Lỗi',
        content: 'Le Duc Tung Test',
    };
    response.redirect('/blog');
})

module.exports = router;