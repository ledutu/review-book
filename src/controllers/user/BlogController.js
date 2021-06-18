var express = require('express');
const { BlogTag } = require('../../models/user/blog_tag');
const { Blog } = require('../../models/user/blog');
const { BlogComment } = require('../../models/user/blog_comment');
const moment = require('moment');

async function index(request, response) {
    try {
        let { page, limit, id, title } = request.query;
        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        blogs = Blog.find({});
        let totalBlog = await Blog.find({}).countDocuments();

        if (id) {
            blogs = Blog.find({ tag: { '$in': id } })
            totalBlog = await Blog.find({ tag: { '$in': id } }).countDocuments();
        }

        if (title) {
            blogs = blogs.where('title').equals({ $regex: new RegExp(title, 'i') });
            totalBlog = await Blog.find({
                title: { $regex: new RegExp(title, 'i') },
                tag: id ? { '$in': id } : { $ne: null }
            }).countDocuments();
        }

        const blogResult = await blogs
            .sort({ vote: -1 })
            .populate('blogger', ['profile'])
            .skip((page * limit) - limit)
            .limit(limit);
            
        const blogPage = {
            data: blogResult,
            total_page: Math.ceil(totalBlog / limit),
            page,
            limit,
        };


        link = '?';
        if (id) {
            link = '?id=' + id;
            if (typeof id === "object") {
                link = '?';
                for (let i = 0; i < id.length; i++) {
                    if (i === id.length - 1) {
                        link += 'id=' + id[i];
                    } else {
                        link += 'id=' + id[i] + '&';
                    }

                }
            }
        }

        blogTag = await BlogTag.find({});
        currentBlogTag = await BlogTag.find({ _id: { '$in': id } });
        response.render('user/blog-list', {
            totalBlog,
            blogPage,
            id,
            blogTag,
            currentBlogTag,
            link,
        });
    } catch (error) {
        console.error(error)
        response.render('user/error')
    }
}

async function getBlogDetail(request, response) {
    const { id } = request.params;

    let { page, limit, full_name, username } = request.query;

    try {

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 5;

        blog = await Blog.findById(id)
            .populate(['tag', 'blogger']);

        blog._doc.createdAt = moment(blog.createdAt).format('L');

        totalComment = await BlogComment.find({ blog: blog._id }).countDocuments();
        comments = await BlogComment.find({ blog: blog._id })
            .populate('user', ['profile'])
            .skip((page * limit) - limit)
            .limit(limit);


        const allComment = {
            data: comments,
            total_page: Math.ceil(totalComment / limit),
            page,
            limit,
        };
        
        blogTag = await BlogTag.find({});

        response.render('user/blog-detail', {
            blog,
            allComment,
            blogTag,
            totalComment,
        });
    } catch (error) {
        console.error(error);
        response.render('user/error');
    }
}

module.exports = {
    index,
    getBlogDetail,
}