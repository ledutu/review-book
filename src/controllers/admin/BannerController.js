var express = require('express');

function index(request, response){
    response.render('admin/banner');
}

module.exports = {
    index,
}