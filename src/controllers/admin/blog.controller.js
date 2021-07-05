var express = require('express');
const { Blog } = require('../../models/user/blog');
const { BlogTag } = require('../../models/user/blog_tag');
const HTTP = require('../../constant/http-status');
async function show(req,res) {
	try {
		let {page,limit , blog_name , full_name ,tag, hide,isConfirm,date_from, date_to} = req.query
		let params = {blog_name, full_name,hide,tag,isConfirm,date_from, date_to}
		page = parseInt(page)
		limit = parseInt(limit)

		if(!page) page = 1
		if(!limit) limit = 5

		link='?'

		let blogs = Blog.find({})
		let totalBlog =  Blog.find({})

		if (blog_name) {
            link += 'blog_name=' + blog_name + '&';
            blogs = blogs.where('title').equals({ $regex: new RegExp(blog_name, 'i') });
            totalBlog = totalBlog.where('title').equals({ $regex: new RegExp(blog_name, 'i') });
        }
		if (tag) {
			if(Array.isArray(tag)){
				tag.map(item =>{
					link += 'tag=' + item + '&';	
				})
			}else{
				link += 'tag=' + tag + '&';
			}
            blogs = blogs.where('tag').equals({ $in: tag });
            totalBlog = totalBlog.where('tag').equals({ $in: tag });
        }
		if (hide) {
			if(hide==='true'){
				link += 'hide=' + hide +'&' 
				blogs = blogs.where('hide').equals({ $in:true })
				totalBlog = totalBlog.where('hide').equals({ $in: true })
			}else if(hide==='false'){
				link += 'hide=' + hide +'&' 
				blogs = blogs.where('hide').equals({ $in:false })
				totalBlog = totalBlog.where('hide').equals({ $in: false })
			}
        }
		if (isConfirm) {
			if(isConfirm==='true'){
				link += 'isConfirm=' + isConfirm +'&' 
				blogs = blogs.where('isConfirm').equals({ $in:true })
				totalBlog = totalBlog.where('isConfirm').equals({ $in: true })
			}else if(isConfirm==='false'){
				link += 'isConfirm=' + isConfirm +'&' 
				blogs = blogs.where('isConfirm').equals({ $in:false })
				totalBlog = totalBlog.where('isConfirm').equals({ $in: false })
			}
        }
        if (date_from) {
            link += 'date_from=' + date_from + '&';
            date_from = date_from.split('/');
            date_from = new Date(date_from[2] + '-' + date_from[1] + '-' + date_from[0]);
            blogs = blogs.where('createdAt').equals({ $gte: date_from });
            totalBlog = totalBlog.where('createdAt').equals({ $gte: date_from });
        }

        if (date_to) {
            link += 'date_from=' + date_to + '&';
            date_to = date_to.split('/');
            date_to = new Date(date_to[2] + '-' + date_to[1] + '-' + date_to[0]);
            blogs = blogs.where('createdAt').equals({ $lte: date_to });
            totalBlog = totalBlog.where('createdAt').equals({ $lte: date_to });
        }


		const blogResults = await blogs 
								.select(['title', 'content','vote','hide','tag', 'createdAt','isConfirm'])
								.populate('tag', ['name', 'tag_color'])
								.populate('blogger',['profile'])
								.skip((page * limit) - limit)
								.limit(limit).lean()
		totalBlog = await totalBlog.countDocuments()
		const allBlogPage = {
			data: blogResults,
			total_page: Math.ceil((totalBlog/limit)),
			page,
			limit,
		}
		blogTags = await BlogTag.find({});
		res.render('admin/blog',{
			allBlogPage , 
			totalBlog,
			params,
			blogTags,
			link
		});

	} catch (error) {
		console.log(error)
        response.render('500');
	}
}
async function hideBlog(req, res) {
	const {id} = req.body;
	try {
		blog = await Blog.findOne({_id:id})
		blog.hide = !blog.hide
		await blog.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: blog.hide ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
		});

	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}
async function confirmBlog(req, res) {
	const {id} = req.body;
	try {
		blog = await Blog.findOne({_id:id})
		blog.isConfirm = !blog.isConfirm
		await blog.save()
		res.status(HTTP.OK).json({
			status: HTTP.OK,
			error: false,
			message: blog.isConfirm ? 'Duyệt thành công' : 'Bỏ duyệt thành công',
		});

	} catch (error) {
		res.status(HTTP.SERVER_ERROR).json({
			status: HTTP.SERVER_ERROR,
			error: true,
			message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
		});
	}
}

async function detail(req, res) {
	try {
		const blogs = await Blog.findById(req.params.id)
									.populate('tag', ['name', 'tag_color'])
									.populate('blogger',['profile'])
        res.render('admin/blog-detail',{blogs});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}


module.exports = {
	show,
	hideBlog,
	confirmBlog,
	detail
};
