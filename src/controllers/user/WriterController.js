var express = require('express');

function index(request, response){
    response.render('user/writer-list');
}

module.exports = {
    index,
}