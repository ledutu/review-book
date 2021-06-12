var express = require('express');
const { BookCategory } = require('../../models/user/book_category');

async function index(request, response) {
	try {
        const bookCategories = await BookCategory.find({})
            .select(['name', 'short_name','tag_color'])
        
            response.render('admin/book-category',{bookCategories});
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
