var express = require('express');

function index(request, response){
    response.render('admin/home');
}

module.exports = {
    index,
}