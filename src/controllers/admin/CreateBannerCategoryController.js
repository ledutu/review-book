var express = require('express');

function index(request, response){
    response.render('admin/create-banner-category');
}

module.exports = {
    index,
}