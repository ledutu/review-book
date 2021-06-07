var express = require('express');

function index(request, response){
    response.render('admin/user');
}

module.exports = {
    index,
}

