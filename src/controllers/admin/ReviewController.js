var express = require('express');
const { Book } = require('../../models/user/book');

async function index(request, response) {
	try {
        const reviews = await Book.find({})
            .populate('reviewer',['profile'])
            .select(['book_name'])
        
            response.render('admin/review',{reviews});
            // response.json(books)
            // console.log(books)
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

module.exports = {
	index,
};
