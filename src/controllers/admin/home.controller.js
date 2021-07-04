var express = require('express');

function index(req, res){
    res.render('admin/home');
}
function logout(req,res){
    req.logout()
    req.app.locals.user = undefined
    res.redirect('/admin')
}
module.exports = {
    index,logout
}