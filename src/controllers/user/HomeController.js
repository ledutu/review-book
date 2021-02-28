var express = require('express');

function index(request, response){
    response.render('user/home');
}

module.exports = {
    index,
}