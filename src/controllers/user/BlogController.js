var express = require('express');
const { BlogTag } = require('../../models/user/blog_tag');
const { Blog } = require('../../models/user/blog');
const { BlogComment } = require('../../models/user/blog_comment');
const { Reaction } = require('../../models/user/reaction');
const moment = require('moment');

async function index(request, response) {
    try {
        let { page, limit, id, title } = request.query;
        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        blogs = Blog.find({
            isConfirm: true,
            hide: false,
        });
        let totalBlog = await Blog.find({
            isConfirm: true,
            hide: false,
        }).countDocuments();

        if (id) {
            blogs = Blog.find({
                tag: { '$in': id },
                isConfirm: true,
                hide: false,
            })
            totalBlog = await Blog.find({
                tag: { '$in': id },
                isConfirm: true,
                hide: false,
            }).countDocuments();
        }

        if (title) {
            blogs = blogs.where('title').equals({ $regex: new RegExp(title, 'i') });
            totalBlog = await Blog.find({
                title: { $regex: new RegExp(title, 'i') },
                tag: id ? { '$in': id } : { $ne: null }
            }).countDocuments();
        }

        const blogResult = await blogs
            .sort({ vote: -1, createdAt: -1 })
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

        blogTag = await BlogTag.find({ block: false });
        currentBlogTag = await BlogTag.find({
            _id: { '$in': id },
            block: false,
        });
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

        user = request.user;

        blog = await Blog.findOne({
            _id: id,
            isConfirm: true,
            hide: false,
        }).populate(['tag', 'blogger']);

        if (!blog) {
            response.render('404');
        }

        totalComment = await BlogComment.find({ blog: blog._id }).countDocuments();
        comments = await BlogComment.find({ blog: blog._id }, {}, { sort: { createdAt: -1 } })
            .populate('user', ['profile'])
            .skip((page * limit) - limit)
            .limit(limit);


        const allComment = {
            data: comments,
            total_page: Math.ceil(totalComment / limit),
            page,
            limit,
        };

        blogTag = await BlogTag.find({ block: false });

        blogReaction = await Reaction.findOne({
            type: 'blog',
            user: user && user._id,
            type_id: id,
        });

        if (!blogReaction) blogReaction = {};

        response.render('user/blog-detail', {
            blog,
            allComment,
            blogTag,
            totalComment,
            blogReaction,
        });
    } catch (error) {
        console.error(error);
        response.render('500');
    }
}

module.exports = {
    index,
    getBlogDetail,
}