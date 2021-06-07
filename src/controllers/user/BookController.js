var express = require('express');
const { Book } = require('../../models/user/book');
const { BookCategory } = require('../../models/user/book_category');

async function index(request, response) {
    try {
        const { category } = request.query;
        
        books = Book.find({});
        
        if (category) {
            books = books.where('category').equals(category);
        }
        
        books = await books.limit(20);

        response.render('user/book-list', [
            books,
        ]);

    } catch (error) {
        console.log(error);
        response.send(error);
    }
}

function getBookDetail(request, response) {
    response.render('user/book-detail');
}

module.exports = {
    index,
    getBookDetail,
}