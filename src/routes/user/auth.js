var express = require('express');
var router = express.Router();
var auth = require('../../config/auth');
var AuthController = require('../../controllers/user/AuthController');
const { isAuthenticate } = require('../../middlewares/user/auth.middleware');

router.post('/login', AuthController.postLogin);
router.post('/sign-up', AuthController.postSignUp);

// Login with google
router.get('/google', auth.authenticate('google', {
    scope: ['profile', 'email'],
}));
router.get('/google/callback', AuthController.loginWithGoogle);

router.get('/facebook', auth.authenticate('facebook', {
    scope: 'email,public_profile',
}));
router.get('/facebook/callback', AuthController.loginWithFacebook);

router.get('/logout', isAuthenticate, AuthController.logout);

module.exports = router;