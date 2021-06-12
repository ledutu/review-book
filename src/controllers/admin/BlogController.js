var express = require('express');
const { Blog } = require('../../models/user/blog');

async function index(request, response) {
	try {
        const blogs = await Blog.find({})
            .populate('blogger',['profile'])
            .select(['title', 'content','vote'])
            // .limit(1)
            response.render('admin/blog',{blogs});
            // response.json(blogs)
            // console.log(books)
	} catch (error) {
		console.log(error);
		response.send(error);
	}
}

module.exports = {
	index,
};
