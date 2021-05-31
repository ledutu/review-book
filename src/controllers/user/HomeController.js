var express = require('express');
const { User } = require('../../models/user/user');
const { Profile } = require('../../models/user/profile');
const { Book } = require('../../models/user/book');
const { Blog } = require('../../models/user/blog');
const { BookCategory } = require('../../models/user/book_category');
const { BookComment } = require('../../models/user/book_comment');
const { BlogComment } = require('../../models/user/blog_comment');
const Notification = require('../../utils/notification');
const Seeder = require('../../utils/seeder');


async function index(request, response) {
    try {
        // message = 'Your version is old. You have to update new version to access application again'

        popularBooks = await Book.find({}, {}, { sort: { vote: -1 } })
            .select(['image', '_id', 'book_name'])
            .populate('category', ['_id', 'short_name']).limit(12);

        console.log(popularBooks[0]);

        response.render('user/home', {
            popularBooks
        });
    } catch (error) {
        console.error(error)
        return response.send(error);
    }
}

function changeLanguage(request, response) {
    const { lang } = request.params;
    response.cookie('lang', lang, { maxAge: 900000 });
    response.redirect('back');
}

module.exports = {
    index,
    changeLanguage,
}