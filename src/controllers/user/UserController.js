var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
// const { User } = require('../../models/user/user.js');
const HTTP = require('../../constant/http-status');
var auth = require('../../config/auth');

async function getUserProfile(request, response) {
    try {
        const { id } = request.params;

        userProfile = await User.findById(id);
        isAuth = false;
        if(typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        response.render('user/user-profile', {
            userProfile,
            isAuth,
        });
    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

async function getUserBookFavorite(request, response) {
    try {
        const { id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id).populate('favorite_book');

        totalfavoriteBook = await Book.find({ _id: userProfile.favorite_book }).countDocuments();

        favoriteBook = await Book.find({ _id: userProfile.favorite_book }, {}, { sort: { vote: -1 } })
            .skip((page * limit) - limit)
            .limit(limit);

        favoriteBookPage = {
            data: favoriteBook,
            total_page: Math.ceil(totalfavoriteBook / limit),
            page,
            limit,
        }

        response.render('user/user-book-favorite', {
            userProfile,
            favoriteBookPage,
        });
    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

async function getUserWriterFavorite(request, response) {
    const { id } = request.params;
    try {
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id).populate('favorite_writer');

        totalfavoriteWriter = await User.find({ _id: userProfile.favorite_writer }).countDocuments();

        favoriteWriter = await User.find({ _id: userProfile.favorite_writer })
            .skip((page * limit) - limit)
            .limit(limit);

        favoriteWriterPage = {
            data: favoriteWriter,
            total_page: Math.ceil(totalfavoriteWriter / limit),
            page,
            limit,
        }

        response.render('user/user-writer-favorite', {
            userProfile,
            favoriteWriterPage,
            totalfavoriteWriter
        });
    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

async function getUserMyReview(request, response) {
    try {
        const { id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id);

        totalMyBook = await Book.find({ reviewer: userProfile._id }).countDocuments();

        myBook = await Book.find({ reviewer: userProfile._id }, {}, { sort: { createdAt: -1 } })
            .skip((page * limit) - limit)
            .limit(limit);

        myBookPage = {
            data: myBook,
            total_page: Math.ceil(totalMyBook / limit),
            page,
            limit,
        }

        response.render('user/user-my-review', {
            userProfile,
            myBookPage,
        });
    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

function postLogin(request, response, next) {
    auth.authenticate('local', (err, user, info) => {
        if (err) {
            if (err.status === HTTP.UN_AUTHORIZED) {
                return response.status(HTTP.UN_AUTHORIZED).json({
                    message: err.message,
                    status: err.status,
                    user: {}
                })
            } else {
                return response.status(HTTP.SERVER_ERROR).json({
                    message: err.message,
                    status: err.status,
                    user: {}
                })
            }
        }

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    return response.status(HTTP.UN_AUTHORIZED).json({
                        user: {},
                        message: error.message,
                        status: error.status,
                    });
                }
                return response.status(HTTP.OK).json({
                    user: request.user,
                    message: 'Đăng nhập thành công',
                    status: 200,
                })
            })
        }
    })(request, response, next);
    return;
}

async function postSignUp(request, response) {

    try {
        // const newUser = User.findOne
    } catch (error) {

    }

    response.send('sign-up')
}

function logout(request, response) {
    request.logout();
    request.app.locals.user = undefined;
    response.redirect('/');
}

module.exports = {
    getUserProfile,
    getUserBookFavorite,
    getUserWriterFavorite,
    getUserMyReview,
    postLogin,
    postSignUp,
    logout,
}