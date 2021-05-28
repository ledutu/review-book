var express = require('express');
const { User } = require('../../models/user/user.js');


function getUserProfile(request, response) {
    response.render('user/user-profile');
}

function getUserBookFavorite(request, response) {
    response.render('user/user-book-favorite');
}

function getUserWriterFavorite(request, response) {
    response.render('user/user-writer-favorite');
}

function postLogin(request, response) {
    const { email, password, remember } = request.body;

    console.log(request.body);    
    
    response.redirect('back')
    
}

async function postSignUp(request, response) {

    try {
        // const newUser = User.findOne
    } catch (error) {

    }

    response.send('sign-up')
}

module.exports = {
    getUserProfile,
    getUserBookFavorite,
    getUserWriterFavorite,
    postLogin,
    postSignUp
}