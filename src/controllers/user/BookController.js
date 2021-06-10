var express = require('express');
const { Book } = require('../../models/user/book');
const { BookCategory } = require('../../models/user/book_category');
const { User } = require('../../models/user/user');
const { BookComment } = require('../../models/user/book_comment');
var moment = require('moment');

async function index(request, response) {
    try {
        const { id } = request.params;

        books = Book.find({});

        if (id) {
            books = books.where('category').equals(id);
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

async function getBookDetail(request, response) {
    const { id } = request.params;
    // book
    try {

        book = await Book.findById(id)
            .populate(['category', 'reviewer', 'book_information']);

        if (book) {
            book._doc.createdAt = moment(book.createdAt).format('L');
            comments = await BookComment.find({book: book._id}).populate('user');
            
            relatedBook = await Book.find({category: book.category}, {}, {sort: {vote: -1}})
            .populate('reviewer', ['profile'])
            .limit(8);
        } else {
            console.log('Cannot find book');
        }

        response.render('user/book-detail', {
            book,
            comments,
            relatedBook,
        });
    } catch (error) {
        console.log(error);
        response.send(error);
    }
}

module.exports = {
    index,
    getBookDetail,
}