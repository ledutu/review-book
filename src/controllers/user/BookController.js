var express = require('express');

function index(request, response){
    response.render('user/book-list');
}

function getBookDetail(request, response){
    response.render('user/book-detail');
}

module.exports = {
    index,
    getBookDetail,
}