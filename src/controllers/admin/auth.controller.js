var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
const HTTP = require('../../constant/http-status');
var auth = require('../../config/auth');
var bcrypt = require('bcrypt');

async function getLoginPage(req,res) {
    try {
        res.render('admin/login')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}


function postLogin(req,res,next){
    auth.authenticate('local', (err, user, info) => {
        if (err) {
            if (err.status === HTTP.UN_AUTHORIZED) {
                return res.status(HTTP.UN_AUTHORIZED).json({
                    message: err.message,
                    status: err.status,
                    user: {}
                })
            } else {
                return res.status(HTTP.SERVER_ERROR).json({
                    message: err.message,
                    status: err.status,
                    user: {}
                })
            }
        }

        if (user) {
            req.logIn(user, {}, function (error) {
                if (error) {
                    return res.status(HTTP.UN_AUTHORIZED).json({
                        message: error.message,
                        status: error.status,
                    });
                }
                return res.status(HTTP.OK).json({
                    message: 'Đăng nhập thành công',
                    status: 200,
                })
            })
        }
    })(req, res, next);
    return;

}

module.exports = {
    getLoginPage,
    postLogin
}