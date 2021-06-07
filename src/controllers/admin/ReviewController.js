var express = require('express');

function index(request, response){
    response.render('admin/review');
}

module.exports = {
    index,
}