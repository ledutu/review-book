var express = require('express');

function index(request, response){
    response.render('admin/blog');
}

module.exports = {
    index,
}