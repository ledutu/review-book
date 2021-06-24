var express = require('express');
var multer = require('multer');
var faker = require('faker');
var fs = require('fs');

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Làm ơn chỉ upload hình ảnh", false);
    }
};

// SET STORAGE
var storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './src/public/statics/uploads/users/'+req.user._id+'/avatar';
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })      
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        originalNameSplit = file.originalname.split('.');
        cb(null, req.user._id + '-' + Date.now() + '.' + originalNameSplit[originalNameSplit.length - 1]);
    },
})

var storageBookReview = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './src/public/statics/uploads/users/'+req.user._id+'/reviews';
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })      
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + '-' + Date.now() + '-' + faker.helpers.slugify(file.originalname).toLowerCase());
    },
})

var uploadAvatar = multer({
    storage: storageAvatar,
    fileFilter: multerFilter,
    limits: {
        fileSize: 5000000,
    }
});
var uploadBookReview = multer({
    storage: storageBookReview,
    fileFilter: multerFilter,
    limits: {
        fileSize: 5000000,
    },
});


uploadAvatar = uploadAvatar.single('avatar');
uploadBookReview = uploadBookReview.any();

//Create middleware upload avatar
const uploadAvatarMiddleware = (request, response, next) => {
    uploadAvatar(request, response, err => {
        console.log(err);
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                request.session.message = {
                    status: 'error',
                    content: 'Chỉ được phép đăng ảnh',
                }
                return response.redirect('back')
            }
            
            if(err.code === "LIMIT_FILE_SIZE") {
                request.session.message = {
                    status: 'error',
                    content: 'Ảnh phải dưới 5Mb',
                }
                return response.redirect('back')
            }
        } else if (err) {
            request.session.message = {
                status: 'error',
                content: 'Có lỗi xảy ra, vui lòng thử lại sau',
            }
            return response.redirect('back')
        }

        // Everything is ok.
        next();
    });
}

//create middleware upload image review field editor
const uploadBookReviewMiddleware = (request, response, next) => {
    uploadBookReview(request, response, err => {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                return response.status(500).json({
                    status: 'error',
                    message: 'Chỉ được phép đăng ảnh',
                })
            }
            
            if(err.code === "LIMIT_FILE_SIZE") {
                return response.status(500).json({
                    status: 'error',
                    message: 'File không được lớn hơn 5 MB',
                })
            }
        } else if (err) {
            return response.status(500).json({
                status: 'error',
                message: 'Có lỗi xảy ra, vui lòng thử lại sau',
            })
        }

        // Everything is ok.
        next();
    });
}

//Create middleware upload book review
const uploadBookReviewImageTitleMiddleware = (request, response, next) => {
    uploadBookReview(request, response, err => {
        if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
            if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                request.session.message = {
                    status: 'error',
                    content: 'Chỉ được phép đăng ảnh',
                }
                return response.redirect('back')
            }
            
            if(err.code === "LIMIT_FILE_SIZE") {
                request.session.message = {
                    status: 'error',
                    content: 'Ảnh phải dưới 5Mb',
                }
                return response.redirect('back')
            }
        } else if (err) {
            request.session.message = {
                status: 'error',
                content: 'Có lỗi xảy ra, vui lòng thử lại sau',
            }
            return response.redirect('back')
        }

        // Everything is ok.
        next();
    });
}

module.exports = {
    uploadAvatarMiddleware,
    uploadBookReviewMiddleware,
    uploadBookReviewImageTitleMiddleware,
}