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
    // try {
        // const userResponse = await user.save();

        // User -> -> BookCategory -> Book -> Blog -> Book Comment -> Blog Comment
        // seeders = await Seeder.createBookCategory();
        // console.log(seeders.bookCategories);
        // console.log(seeders.blogs);
        // await BlogComment.insertMany(seeders.blogComments);
        // await BookCategory.insertMany(seeders.bookCategories);
        // const users = await User.find({}).select('_id').limit(2);
        
        // const books = await Book.find({}).populate('reviewer').populate('category');
        
        // console.log(books[0]);
        
        message = 'Your version is old. You have to update new version to access application again'

        // Notification.show(request, message);
        // Notification.dismiss(request);
        response.render('user/home', { message });
    // } catch (error) {
    //     console.log('err')
    //     return response.send(error);
    // }
}

module.exports = {
    index,
}