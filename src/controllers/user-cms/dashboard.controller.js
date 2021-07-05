var express = require('express');
function index(req, res) {
    res.render('user-cms/dashboard');
}
function logout(req,res){
    req.logout()
    req.app.locals.user = undefined
    res.redirect('/')
}
module.exports = {
    index,
    logout
}