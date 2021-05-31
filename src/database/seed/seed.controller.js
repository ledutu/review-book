var express = require('express');
const Seeder = require('../../utils/seeder');
const { User } = require('../../models/user/user');
const { Profile } = require('../../models/user/profile');
const { Book } = require('../../models/user/book');
const { Blog } = require('../../models/user/blog');
const { BookCategory } = require('../../models/user/book_category');
const { BookComment } = require('../../models/user/book_comment');
const { BlogComment } = require('../../models/user/blog_comment');

async function createUser(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createUserDatabaseSeed(times, locale);
        console.log("User database: ");

        await User.insertMany(seeders.users);
        await Profile.insertMany(seeders.profiles);

        console.info('Create user database successful');
        response.status(200).json({
            status: 'OK',
        });
    } catch (error) {
        console.error(error);
        console.error('Creaate user database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createBookCategory(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createBookCategory(times, locale);
        console.log("Category database: ");

        await BookCategory.insertMany(seeders.bookCategories);

        console.info('Create book category database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate book category database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createBook(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createBookWithoutCategoryDbSeed(times, locale);
        console.log("Book database: ");

        await Book.insertMany(seeders.books);
        console.info('Create book database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Create book database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createBlog(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createBlog(times, locale);
        console.log("Blog database: ");

        await Blog.insertMany(seeders.blogs);

        console.info('Create blog database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate blog database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createBookComment(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createBookComment(times, locale);
        console.log("Book comment database: ");

        await BookComment.insertMany(seeders.bookComments);

        console.info('Create book comment database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate book comment database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

async function createBlogComment(request, response) {
    let { times, locale } = request.query;
    times = parseInt(times);
    
    if (!times) {
        times = 5;
    }

    try {
        seeders = await Seeder.createBlogComment(times, locale);
        console.log("Blog comment database: ");

        await BlogComment.insertMany(seeders.blogComments);

        console.info('Create blog comment database successful');
        response.status(200).json({
            status: 'OK',
        });;
    } catch (error) {
        console.error(error);
        console.error('Creaate blog comment database fail, Please try again');
        response.status(500).json({
            status: 'FAIL',
        });;
    }
}

module.exports = {
    createUser,
    createBookCategory,
    createBook,
    createBlog,
    createBookComment,
    createBlogComment,
}