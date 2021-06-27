var express = require('express');
var router = express.Router();
var { isAuthenticate } = require('../../middlewares/user/auth.middleware');

//import controller
const UserController = require('../../controllers/user/UserController');

var { isAuthenticate } = require('../../middlewares/user/auth.middleware');
var FILE = require('../../middlewares/user/file.middleware');

router.use(isAuthenticate);

// get home
router.get('/profile/*-:id', UserController.getUserProfile);
router.get('/book-favorite/*-:id', UserController.getUserBookFavorite);
router.get('/writer-favorite/*-:id', UserController.getUserWriterFavorite);
router.get('/my-review/*-:id', UserController.getUserMyReview);
router.get('/write-review', UserController.getWriteReview);

router.post('/update-information', UserController.updateInformation);
router.post('/update-password', UserController.updateUserPassword);
router.post('/update-avatar', FILE.uploadAvatarMiddleware, UserController.updateAvatar);
router.post('/upload-image', FILE.uploadBookReviewMiddleware, UserController.uploadImage);
router.post('/write-review', FILE.uploadBookReviewImageTitleMiddleware, UserController.postWriteReview);

module.exports = router;