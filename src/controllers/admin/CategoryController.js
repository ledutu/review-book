var express = require('express');

function index(request, response){
    response.render('admin/category');
}

module.exports = {
    index,
}