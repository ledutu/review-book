var express = require('express');
const { Blog } = require('../../models/user/blog');

async function show(req,res) {
	let {page,limit , title , username , hide} = req.query
	try {
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if(!limit) limit = 5

		let blogs = Blog.find({})
		let totalBlog = await Blog.find({}).countDocuments()

		if(title){
			blogs = Blog.find({ 'title': { $regex: new RegExp(title, 'i') } });
            totalBlog = await Blog.find({ 'title': { $regex: new RegExp(title, 'i') } }).countDocuments()
		}
		if (hide) {
			if(hide==='true'){
				blogs = Blog.find({'hide':true})
				totalBlog = await Blog.find({ 'hide': true }).countDocuments()
			}else if(hide==='false'){
				blogs = Blog.find({'hide':false})
				totalBlog = await Blog.find({ 'hide': false }).countDocuments()
			}
        }


		const blogResults = await blogs 
								.populate('blogger',['profile'])
								.select(['title', 'content','vote','hide'])
								.skip((page * limit) - limit)
								.limit(limit).lean()
		const allBlogPage = {
			data: blogResults,
			total_page: Math.ceil((totalBlog/limit)),
			page,
			limit,
		}
		res.render('admin/blog',{allBlogPage , totalBlog});

	} catch (error) {
		
	}
}
async function update(req, res) {
	try {
		const blog = await Blog.findById(req.params.id)
		blog.hide = !blog.hide
		// await User.updateOne({_id:req.params.id }, {$set:{'block':req.params.block}})
		const newBlog =await blog.save()
		res.json({newBlog})

	} catch (error) {
		console.log(error);
		res.send(error);
	}
}

async function getBlogTags(req,res) {
	try {
		res.render('admin/blog-tag');

	} catch (error) {
		
	}
}


module.exports = {
	show,
	update,
	getBlogTags
};
