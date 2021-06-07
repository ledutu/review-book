var express = require('express');

function index(request, response){
    response.render('admin/history');
}

module.exports = {
    index,
}