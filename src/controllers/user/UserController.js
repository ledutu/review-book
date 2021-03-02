var express = require('express');

function getUserProfile(request, response){
    response.render('user/user-profile');
}

function getUserBookFavorite(request, response){
    response.render('user/user-book-favorite');
}

function getUserWriterFavorite(request, response){
    response.render('user/user-writer-favorite');
}

module.exports = {
    getUserProfile,
    getUserBookFavorite,
    getUserWriterFavorite,
}