var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
const HTTP = require('../../constant/http-status');
var auth = require('../../config/auth');
var bcrypt = require('bcrypt');

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
                        message: error.message,
                        status: error.status,
                    });
                }
                return response.status(HTTP.OK).json({
                    message: 'Đăng nhập thành công',
                    status: 200,
                })
            })
        }
    })(request, response, next);
    return;
}

async function postSignUp(request, response) {
    const { full_name, email, password, passwordConfirm } = request.body;
    try {
        existUser = await User.findOne({ email: email });

        if (existUser) {
            return response.status(HTTP.OK).json({
                user: request.user,
                message: 'Email này tồn tại',
                status: HTTP.OK,
                error: true,
            });
        }

        if (password !== passwordConfirm) {
            return response.status(HTTP.OK).json({
                user: request.user,
                message: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
                status: HTTP.OK,
                error: true,
            });
        }

        let hashPassword = bcrypt.hashSync(password, 12);
        user = new User({
            email,
            profile: { full_name },
            password_not_hash: password,
            password: hashPassword,
            favorite_writer: [],
            favorite_book: [],
        });

        await user.save();

        request.logIn(user, {}, function (error) {
            return response.status(HTTP.OK).json({
                message: 'Tạo tài khoản thành công',
                status: HTTP.OK,
                error: false,
            });
        })
    } catch (error) {
        console.error(error);
        return response.status(HTTP.SERVER_ERROR).json({
            message: 'Có lỗi xảy ra, vui lòng thử lại sau',
            status: HTTP.SERVER_ERROR,
            error: true,
        })
    }
}

function loginWithGoogle(request, response, next) {
    auth.authenticate('google', (err, user, info) => {
        if (err) {
            request.session.message = {
                status: 'error',
                content: 'Đăng nhập thất bại, vui lòng thử lại sau.'
            }
            return response.redirect('/');
        }

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    request.session.message = {
                        status: 'error',
                        content: 'Đăng nhập thất bại, vui lòng thử lại sau.'
                    }
                    return response.redirect('/');
                }

                request.session.message = {
                    status: 'success',
                    content: 'Đăng nhập thành công.'
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
            request.session.message = {
                status: 'error',
                content: 'Đăng nhập thất bại, vui lòng thử lại sau.'
            }
            return response.redirect('/');
        }

        if (user) {
            request.logIn(user, {}, function (error) {
                if (error) {
                    request.session.message = {
                        status: 'error',
                        content: 'Đăng nhập thất bại, vui lòng thử lại sau.'
                    }
                    return response.redirect('/');
                }

                request.session.message = {
                    status: 'success',
                    content: 'Đăng nhập thành công.'
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