var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
const HTTP = require('../../constant/http-status');
var auth = require('../../config/auth');
var bcrypt = require('bcrypt');

async function getLoginPage(req, res) {
    try {
        res.render('admin/login')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}


function postLogin(req, res, next) {
    auth.authenticate('local', (err, user, info) => {
        if (err) {
            req.session.message = {
                status: 'error',
                content: err.message,
            }
            return res.redirect('/admin/login');
        }

        if (user) {
            req.logIn(user, {}, function (error) {
                if (error) {
                    req.session.message = {
                        status: 'error',
                        content: err.message,
                    }
                    return res.redirect('/admin/login');
                }

                req.session.message = {
                    status: 'success',
                    content: 'Đăng nhập thành công',
                }

                return res.redirect('/admin');
            })
        }
    })(req, res, next);
    return;

}

module.exports = {
    getLoginPage,
    postLogin
}