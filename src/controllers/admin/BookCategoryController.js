var express = require('express');

function index(request, response){
    response.render('admin/book-category');
}

module.exports = {
    index,
}