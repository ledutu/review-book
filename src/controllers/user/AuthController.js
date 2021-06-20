var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
const HTTP = require('../../constant/http-status');
var auth = require('../../config/auth');

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

function loginWithGoogle(request, response, next) {
    auth.authenticate('google', (err, user, info) => {
        if (err) {
            return response.redirect(500, '/');
        }

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    return response.redirect(401, '/');
                }

                return response.redirect('/')
            })
        }
    })(request, response, next);
    return;
}

function loginWithFacebook(request, response, next) {
    auth.authenticate('facebook', (err, user, info) => {
        
        console.log(err, user, info);
        
        if (err) {
            return response.redirect(500, '/');
        }

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    return response.redirect(401, '/');
                }

                return response.redirect('/');
            })
        }
    })(request, response, next);
    return;
}

function logout(request, response) {
    request.logout();
    request.app.locals.user = undefined;
    response.redirect('/');
}

module.exports = {
    postLogin,
    postSignUp,
    loginWithGoogle,
    loginWithFacebook,
    logout,
}