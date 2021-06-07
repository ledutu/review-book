var express = require('express');

function index(request, response){
    response.render('admin/book');
}

module.exports = {
    index,
}