var express = require('express');
const { Book } = require('../../models/user/book');
const { BookCategory } = require('../../models/user/book_category');
async function show(request, response) {
	try {
		const books = await Book.find({})
			.populate('category', ['name', 'short_name'])
			.select(['book_name', 'image']);

		response.render('admin/book', { books });
		// response.json(books)
		// console.log(books)
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}
async function edit(request, response) {
	try {
		const books = await Book.findById(request.params.id).populate(
			'category',
			['name', 'short_name']
		);
		let arrID = [];
		for (let index = 0; index < books.category.length; index++) {
			arrID = [...arrID, books.category[index]._id];
		}

		const categories = await BookCategory.find({});

        

        for (let index = 0; index < categories.length; index++) {
            var isInArray = arrID.some(function (cate) {
                return cate.equals(categories[index]._id);
            });

            console.log(isInArray)
        }
		// const books = await User.find({})
		// 	.select(['_id', 'email', 'profile'])
		response.render('admin/edit-book', { books, categories, arrID });
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

async function update(request, response) {
	try {
		response.json(request.body);
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

module.exports = {
	show,
	edit,
	update,
};
