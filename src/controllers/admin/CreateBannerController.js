var express = require('express');

function index(request, response){
    response.render('admin/create-banner');
}

module.exports = {
    index,
}