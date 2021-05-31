var express = require('express');
var router = express.Router();

const SeedController = require('./seed.controller');

// User -> BookCategory -> Book -> Blog -> Book Comment -> Blog Comment
router.get('/user', SeedController.createUser);
router.get('/book-category', SeedController.createBookCategory);
router.get('/book', SeedController.createBook);
router.get('/blog', SeedController.createBlog);
router.get('/book-comment', SeedController.createBookComment);
router.get('/blog-comment', SeedController.createBlogComment);

module.exports = router;