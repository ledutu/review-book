const { Blog } = require('../../models/user/blog');
const { BlogTag } = require('../../models/user/blog_tag');
const { BlogComment } = require('../../models/user/blog_comment');
const { Reaction } = require('../../models/user/reaction');
const HTTP = require('../../constant/http-status');


async function index(request, response) {
    try {
        let { page, limit, blog_name, tag, date_from, date_to } = request.query;

        let params = { blog_name, tag, date_from, date_to };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;
        blogs = Blog.find({ blogger: user._id }, {}, { sort: { vote: -1, createdAt: -1 } });
        link = '?';

        let totalBlog = Blog.find({ blogger: user._id });

        if (blog_name) {
            link += 'blog_name=' + blog_name + '&';
            blogs = blogs.where('title').equals({ $regex: new RegExp(blog_name, 'i') });
            totalBlog = totalBlog.where('title').equals({ $regex: new RegExp(blog_name, 'i') });
        }

        if (tag) {
            tag.map(item => {
                link += 'tag=' + item + '&';
            });
            blogs = blogs.where('tag').equals({ $in: tag });
            totalBlog = totalBlog.where('tag').equals({ $in: tag });
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

        const blogResult = await blogs
            .select(['title', 'slug', 'tag', 'hide', 'isConfirm', 'createdAt'])
            .populate('tag', ['name', 'tag_color'])
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalBlog = await totalBlog.countDocuments();

        const blogPage = {
            data: blogResult,
            total_page: Math.ceil(totalBlog / limit),
            page,
            limit,
        };

        blogTags = await BlogTag.find({});

        response.render('user-cms/blog-management', {
            blogPage,
            params,
            blogTags,
            link,
            totalBlog,
        });

    } catch (error) {
        console.log(error)
        response.render('500');
    }

}

async function deleteBlog(request, response) {
    // Xóa reaction
    // Xóa comment
    // Xóa blog
    const { id } = request.body;
    try {
        user = request.user;
        blog = await Blog.findOne({
            _id: id,
            blogger: user._id,
        });
        if (!blog) {
            response.status(HTTP.OK).json({
                status: HTTP.OK,
                error: true,
                message: 'Không tìm thấy bài blog',
            });
        }

        await BlogComment.deleteMany({
            blog: id,
        });

        await Reaction.deleteMany({
            type: 'blog',
            type_id: id,
        });

        await blog.delete();

        response.status(HTTP.OK).json({
            status: HTTP.OK,
            error: false,
            message: 'Xóa bài thành công',
        });

    } catch (error) {
        console.error(error)
        response.status(HTTP.SERVER_ERROR).json({
            status: HTTP.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
    }
}

async function hideBlog(request, response) {
    const { id } = request.body;
    try {
        user = request.user;
        blog = await Blog.findOne({
            _id: id,
            blogger: user._id,
        });
        if (!blog) {
            response.status(HTTP.OK).json({
                status: HTTP.OK,
                error: true,
                message: 'Không tìm thấy bài blog',
            });
        }
        blog.hide = !blog.hide;

        await blog.save();

        response.status(HTTP.OK).json({
            status: HTTP.OK,
            error: false,
            message: blog.hide ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
        });

    } catch (error) {
        console.error(error)
        response.status(HTTP.SERVER_ERROR).json({
            status: HTTP.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
    }
}

async function getCreate(request, response) {
    try {
        const { id } = request.query;

        blogTags = await BlogTag.find({}).select(['name']);
        blog = {};

        if (id) {
            blog = await Blog.findById(id);
        }

        return response.render('user-cms/create-blog', {
            blogTags,
            blog,
            id,
        })
    } catch (error) {
        console.log(error)
        response.render('500');
    }
}

async function postCreate(request, response) {
    try {
        let { blog_name, tag, slug, content } = request.body;

        user = request.user;
        
        blog = new Blog({
            title: blog_name,
            blogger: user._id,
            content,
            tag,
            slug,
        });

        await blog.save();

        request.session.message = {
            status: 'success',
            content: 'Đăng bài thành công!',
        }

        return response.redirect('/user-cms/blog');

    } catch (error) {
        console.error(error);
        return response.redirect('500');
    }
}

async function postUpdate(request, response) {
    try {
        let { blog_name, tag, slug, content, id } = request.body;

        user = request.user;
        
        blog = await Blog.findById(id);

        if (!blog) {
            request.session.message = {
                status: 'error',
                content: 'Không tìm thấy bài viết',
            }

            return response.redirect('back');
        }

        blog.title = blog_name;
        blog.tag = tag;
        blog.slug = slug;
        blog.content = content;

        await blog.save();

        request.session.message = {
            status: 'success',
            content: 'Cập nhật bài thành công!',
        }

        return response.redirect('/user-cms/blog');

    } catch (error) {
        console.error(error);
        return response.redirect('500');
    }
}

module.exports = {
    index,
    hideBlog,
    deleteBlog,
    getCreate,
    postCreate,
    postUpdate,
}