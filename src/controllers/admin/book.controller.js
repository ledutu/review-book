var express = require('express');
const { Book } = require('../../models/user/book');
const { BookCategory } = require('../../models/user/book_category');
async function show(req, res) {
	try {
		const books = await Book.find({})
			.populate('category', ['name', 'short_name'])
			.select(['book_name', 'image']);

		res.render('admin/book', { books });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
async function edit(req, res) {
	try {
		const books = await Book.findById(req.params.id).populate(
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
		res.render('admin/edit-book', { books, categories, arrID });
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function update(req, res) {
	try {
		res.json(req.body);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}


module.exports = {
	show,
	edit,
	update,
};
