var express = require('express');

function index(request, response){
    response.render('admin/create-book-category');
}

module.exports = {
    index,
}