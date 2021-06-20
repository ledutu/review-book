var express = require('express');
const { BookCategory } = require('../../models/user/book_category');

async function show(req, res) {
	let {page,limit} = req.query
	try {

		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if (!limit) limit = 5

		let category = BookCategory.find({})

		let totalCategory = await BookCategory.countDocuments();

		const categoryResults = await category 
								.select(['name', 'short_name','tag_color'])
								.skip((page * limit) - limit)
								.limit(limit)
		const allCatePage = {
			data: categoryResults,
			total_page: Math.ceil((totalCategory/limit)),
			page,
			limit,
		}
        
            res.render('admin/book-category',{totalCategory,allCatePage});
            // res.json(books)
            // console.log(books)
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function create(req,res) {
	try {
		res.render('admin/create-book-category');
	} catch (error) {
		console.log(error);
		res.send(error)
	}
}

module.exports = {
	show,create
};
