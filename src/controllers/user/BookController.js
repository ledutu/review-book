var express = require('express');
const { Book } = require('../../models/user/book');
const { BookCategory } = require('../../models/user/book_category');
const { User } = require('../../models/user/user');
const { BookComment } = require('../../models/user/book_comment');
var moment = require('moment');

async function index(request, response) {
    try {

        let { page, limit, id, book_name } = request.query;
        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 20;

        books = Book.find({});
        let totalBooks = await Book.find({}).countDocuments();
        
        if (id) {
            books = Book.find({ category: { '$in': id } })
            totalBooks = await Book.find({ category: { '$in': id } }).countDocuments();
        }

        if (book_name) {
            books = books.where('book_name').equals({ $regex: new RegExp(book_name, 'i') });
            totalBooks = await Book.find({
                book_name: { $regex: new RegExp(book_name, 'i') },
                category: id ? { '$in': id } : { $ne: null }
            }).countDocuments();
        }

        const bookResult = await books
            .sort({ vote: -1 })
            .skip((page * limit) - limit)
            .limit(limit);

        const bookPage = {
            data: bookResult,
            total_page: Math.ceil(totalBooks / limit),
            page,
            limit,
        };
        
        console.log(typeof id);
        
        // response.json('OK')
        link = '?';
        if(id){
            link = '?id='+id;
            console.log(typeof id);
            if(typeof id === "object") {
                link = '?';
                for (let i = 0; i < id.length; i++) {
                    if(i === id.length - 1) {
                        link += 'id='+id[i];
                    } else {
                        link += 'id='+id[i]+'&';
                    }
                    
                }            
            }
        
        }

        bookCategory = await BookCategory.find({});
        currentCategory = await BookCategory.find({ _id: { '$in': id } });

        response.render('user/book-list', {
            totalBooks,
            bookPage,
            id,
            bookCategory,
            currentCategory,
            link,
        });

    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

async function getBookDetail(request, response) {
    const { id } = request.params;
    let { page, limit, full_name, username } = request.query;

    // book
    try {

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 5;

        book = await Book.findById(id)
            .populate(['category', 'reviewer', 'book_information']);

        book._doc.createdAt = moment(book.createdAt).format('L');

        totalComment = await BookComment.find({ book: book._id }).countDocuments();
        comments = await BookComment.find({ book: book._id })
            .populate('user')
            .skip((page * limit) - limit)
            .limit(limit);

        relatedBook = await Book.find({ category: book.category }, {}, { sort: { vote: -1 } })
            .populate('reviewer', ['profile'])
            .limit(5);

        const allComment = {
            data: comments,
            total_page: Math.ceil(totalComment / limit),
            page,
            limit,
        };

        response.render('user/book-detail', {
            book,
            relatedBook,
            allComment,
        });
    } catch (error) {
        console.log(error);
        response.render('user/error');
    }
}

module.exports = {
    index,
    getBookDetail,
}