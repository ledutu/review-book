var express = require('express');

function index(req, res){
    res.render('admin/history');
}

module.exports = {
    index,
}