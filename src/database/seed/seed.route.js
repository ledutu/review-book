var express = require('express');
var router = express.Router();

const SeedController = require('./seed.controller');

// User -> BookCategory -> Book -> Blog -> Book Comment -> Blog Comment
router.get('/user', SeedController.createUser);
router.get('/book-category', SeedController.createBookCategory);
router.get('/book', SeedController.createBook);
router.get('/blog-tag', SeedController.createBlogTag);
router.get('/blog', SeedController.createBlog);
router.get('/book-comment', SeedController.createBookComment);
router.get('/blog-comment', SeedController.createBlogComment);
router.get('/create-book-vote', SeedController.createBookVote);
router.get('/create-blog-vote', SeedController.createBlogVote);
router.get('/calculate-vote', SeedController.calculateVote);

module.exports = router;