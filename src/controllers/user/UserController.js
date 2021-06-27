var express = require('express');
const { User } = require('../../models/user/user.js');
const { Book } = require('../../models/user/book.js');
const { Blog } = require('../../models/user/blog.js');
const { BookCategory } = require('../../models/user/book_category');
var bcrypt = require('bcrypt');
var moment = require('moment');
var HTTP = require('../../constant/http-status');

async function getUserProfile(request, response) {
    try {
        const { id } = request.params;

        userProfile = await User.findById(id);
        isAuth = false;
        if (typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        userProfile._doc.profile.birthday = moment(userProfile._doc.profile.birthday).format('YYYY-MM-DD');

        // request.session.message = 'sadfsdf';
        // request.session.cookie.expires = Date.now() + 10000;
        // request.session.save();

        response.render('user/user-profile', {
            userProfile,
            isAuth,
        });
    } catch (error) {
        console.log(error);
        response.render('500');
    }
}

async function getUserBookFavorite(request, response) {
    try {
        const { id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id).populate('favorite_book');

        totalfavoriteBook = await Book.find({ _id: userProfile.favorite_book }).countDocuments();

        favoriteBook = await Book.find({ _id: userProfile.favorite_book }, {}, { sort: { vote: -1 } })
            .skip((page * limit) - limit)
            .limit(limit);

        favoriteBookPage = {
            data: favoriteBook,
            total_page: Math.ceil(totalfavoriteBook / limit),
            page,
            limit,
        }

        isAuth = false;
        if (typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        response.render('user/user-book-favorite', {
            userProfile,
            favoriteBookPage,
            isAuth,
        });
    } catch (error) {
        console.log(error);
        response.render('500');
    }
}

async function getUserWriterFavorite(request, response) {
    const { id } = request.params;
    try {
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id).populate('favorite_writer');

        totalfavoriteWriter = await User.find({ _id: userProfile.favorite_writer }).countDocuments();

        favoriteWriter = await User.find({ _id: userProfile.favorite_writer })
            .skip((page * limit) - limit)
            .limit(limit);

        favoriteWriterPage = {
            data: favoriteWriter,
            total_page: Math.ceil(totalfavoriteWriter / limit),
            page,
            limit,
        }

        isAuth = false;
        if (typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        response.render('user/user-writer-favorite', {
            userProfile,
            favoriteWriterPage,
            totalfavoriteWriter,
            isAuth,
        });
    } catch (error) {
        console.log(error);
        response.render('500');
    }
}

async function getUserMyReview(request, response) {
    try {
        const { id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id);

        totalMyBook = await Book.find({ 
            reviewer: userProfile._id,
            isConfirm: true,
            hide: false,
        }).countDocuments();

        myBook = await Book.find({ 
            reviewer: userProfile._id,
            isConfirm: true,
            hide: false,
        }, {}, { sort: { createdAt: -1 } })
            .skip((page * limit) - limit)
            .limit(limit);

        myBookPage = {
            data: myBook,
            total_page: Math.ceil(totalMyBook / limit),
            page,
            limit,
        };

        isAuth = false;
        if (typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        response.render('user/user-my-review', {
            userProfile,
            myBookPage,
            isAuth
        });
    } catch (error) {
        console.log(error);
        response.render('500');
    }
}

async function getUserMyBlog(request, response) {
    try {
        const { id } = request.params;
        let { page, limit } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (!page) page = 1;
        if (!limit) limit = 10;

        userProfile = await User.findById(id);

        totalMyBlog = await Blog.find({ 
            blogger: userProfile._id,
            isConfirm: true,
            hide: false,
        }).countDocuments();

        myBlog = await Blog.find({ 
            blogger: userProfile._id,
            isConfirm: true,
            hide: false,
        }, {}, { sort: { vote: -1, createdAt: -1 } })
            .populate('blogger', ['profile'])
            .skip((page * limit) - limit)
            .limit(limit);

        myBlogPage = {
            data: myBlog,
            total_page: Math.ceil(totalMyBlog / limit),
            page,
            limit,
        };

        isAuth = false;
        if (typeof request.user !== 'undefined' && request.user._id.equals(userProfile._id)) {
            isAuth = true;
        }

        response.render('user/user-my-blog', {
            userProfile,
            myBlogPage,
            isAuth
        });
    } catch (error) {
        console.log(error);
        response.render('500');
    }
}

async function updateInformation(request, response) {
    try {
        const {
            username,
            email,
            full_name,
            address,
            gender,
            birthday,
            introduction,
        } = request.body;

        user = request.user;

        existUser = await User.findOne({ email }).select('_id');

        if (existUser && !existUser._id.equals(user._id)) {
            request.session.message = {
                status: 'error',
                content: 'Email ' + email + ' đã tồn tại',
            }

            return response.redirect('back');
        }

        user.profile.username = username;
        user.email = email;
        user.profile.full_name = full_name;
        user.profile.address = address;
        user.profile.birthday = new Date(request.body.birthday);
        user.profile.gender = gender;
        user.profile.introduction = introduction;


        await user.save();

        request.session.message = {
            status: 'success',
            content: 'Cập nhật thông tin tài khoản thành công',
        }

        return response.redirect('back');

    } catch (error) {
        console.error(error);
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }
        return response.redirect('back')
    }
}

async function updateUserPassword(request, response) {
    try {
        const { password, newPassword, newPasswordConfirm } = request.body;
        user = await User.findById(request.user._id).select(['password', 'password_not_hash']);

        if (user.password_not_hash !== password) {
            request.session.message = {
                status: 'error',
                content: 'Mật khẩu cũ không đúng',
            }

            return response.redirect('back');
        }

        if (newPassword !== newPasswordConfirm) {
            request.session.message = {
                status: 'error',
                content: 'Mật khẩu mới và xác nhận mật khẩu mới không trùng nhau',
            }

            return response.redirect('back');
        }

        if (newPassword === user.password_not_hash) {
            request.session.message = {
                status: 'error',
                content: 'Mật khẩu mới không được trùng mật khẩu cũ',
            }

            return response.redirect('back');
        }

        user.password_not_hash = newPassword;
        user.password = bcrypt.hashSync(newPassword, 12);

        await user.save();

        request.session.message = {
            status: 'success',
            content: 'Đổi mật khẩu thành công',
        }

        return response.redirect('back');
    } catch (error) {
        console.error(error);
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }
        return response.redirect('back')
    }
}

async function updateAvatar(request, response) {
    try {
        user = request.user;

        user.profile.image = '/statics/uploads/users/' + request.user._id + '/avatar/' + request.file.filename;
        user.save();

        request.session.message = {
            status: 'success',
            content: 'Cập nhật ảnh đại diện thành công',
        }

        return response.redirect('back');
    } catch (error) {
        console.error(error);
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }
        return response.redirect('back')
    }
}

async function getWriteReview(request, response) {
    try {

        userProfile = request.user;

        if (!userProfile) {
            request.session.message = {
                status: 'error',
                content: 'Bạn phải đăng nhập mới vào được chức năng này',
            }

            return response.redirect('back');
        }

        bookCategories = await BookCategory.find({}).select(['name']);

        isAuth = true;

        return response.render('user/write-review', {
            userProfile,
            isAuth,
            bookCategories,
        })
    } catch (error) {
        console.error(error)
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
        }

        return response.redirect('back');
    }
}

async function postWriteReview(request, response) {
    try {
        let { book_name, category, slug, review } = request.body;
        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';
        const titleImage = BASE_URL + request.files[0].filename;
        const bannerImage = BASE_URL + request.files[1].filename;
        const smallImage = BASE_URL + request.files[2].filename;

        bookReview = new Book({
            book_name,
            review,
            reviewer: user._id,
            image: {
                title: titleImage,
                banner: bannerImage,
                small: smallImage,
            },
            category,
            slug,
        });

        await bookReview.save();

        request.session.message = {
            status: 'success',
            content: 'Đăng bài thành công!',
        }

        return response.redirect('/user/my-review/' + user.profile.username + '-' + user._id);

    } catch (error) {
        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại.',
        }

        return response.redirect('back');
    }
}

async function uploadImage(request, response) {

    file = request.files[0];

    return response.status(200).json({
        status: 'OK',
        location: '/statics/uploads/users/' + request.user._id + '/reviews/' + file.filename,
    })
}

module.exports = {
    getUserProfile,
    getUserBookFavorite,
    getUserWriterFavorite,
    getUserMyReview,
    updateInformation,
    updateUserPassword,
    updateAvatar,
    getWriteReview,
    postWriteReview,
    uploadImage,
    getUserMyBlog,
}