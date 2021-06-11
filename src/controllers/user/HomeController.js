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

        books = Book.find({})
            .select(['image', '_id', 'book_name', 'slug'])
            .populate('category', ['_id', 'short_name', 'tag_color']);

        categories = BookCategory.find({}).populate('children');

        //Get popular book
        popularBooks = await books.sort({ 'votest': -1 }).limit(12);

        request.app.locals.categories = await categories;

        popularCategories = await categories.sort({ 'visited': -1 }).limit(3);

        votestBooks = [];
        latestBooks = [];

        for (let i = 0; i < popularCategories.length; i++) {
            votestBooks[i] = await books.where('category').equals(popularCategories[i]._id)
                .sort({ vote: -1 })
                .limit(12);

            latestBooks[i] = await books.where('category').equals(popularCategories[i]._id)
                .sort({ createdAt: -1 })
                .limit(12);
        };

        mostContributor = await User.find({}, {}, { sort: { total_book: -1 } })
            .select(['profile', 'total_book'])
            .limit(4);

        response.render('user/home', {
            popularBooks,
            popularCategories,
            votestBooks,
            latestBooks,
            mostContributor,
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