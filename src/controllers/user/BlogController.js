var express = require('express');

function index(request, response, id) {
    
    response.render('user/blog-list');
}

function getBlogDetail(request, response, id){
    response.render('user/blog-detail');
}

module.exports = {
    index,
    getBlogDetail,
}