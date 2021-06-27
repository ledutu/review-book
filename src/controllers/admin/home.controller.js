var express = require('express');

function index(req, res){
    res.render('admin/home');
}

module.exports = {
    index,
}