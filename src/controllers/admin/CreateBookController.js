var express = require('express');

function index(request, response){
    response.render('admin/create-book');
}

module.exports = {
    index,
}