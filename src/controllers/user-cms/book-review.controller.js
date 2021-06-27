const { BookCategory } = require('../../models/user/book_category');
const { Book } = require('../../models/user/book');
const { BookComment } = require('../../models/user/book_comment');
const { Reaction } = require('../../models/user/reaction');
const HTTP = require('../../constant/http-status');

async function index(request, response) {
    try {
        let { page, limit, book_name, category, date_from, date_to } = request.query;

        let params = { book_name, category, date_from, date_to };

        page = parseInt(page);
        limit = parseInt(limit)

        if (!page) page = 1;
        if (!limit) limit = 10;

        user = request.user;
        books = Book.find({ reviewer: user._id });
        link = '?';

        let totalBooks = Book.find({ reviewer: user._id });

        if (book_name) {
            link += 'book_name=' + book_name + '&';
            books = books.where('book_name').equals({ $regex: new RegExp(book_name, 'i') });
            totalBooks = totalBooks.where('book_name').equals({ $regex: new RegExp(book_name, 'i') });
        }

        if (category) {
            category.map(item => {
                link += 'category=' + item + '&';
            });
            books = books.where('category').equals({ $in: category });
            totalBooks = totalBooks.where('category').equals({ $in: category });
        }

        if (date_from) {
            link += 'date_from=' + date_from + '&';
            date_from = date_from.split('/');
            date_from = new Date(date_from[2] + '-' + date_from[1] + '-' + date_from[0]);
            books = books.where('createdAt').equals({ $gte: date_from });
            totalBooks = totalBooks.where('createdAt').equals({ $gte: date_from });
        }

        if (date_to) {
            link += 'date_from=' + date_to + '&';
            date_to = date_to.split('/');
            date_to = new Date(date_to[2] + '-' + date_to[1] + '-' + date_to[0]);
            books = books.where('createdAt').equals({ $lte: date_to });
            totalBooks = totalBooks.where('createdAt').equals({ $lte: date_to });
        }

        const bookResult = await books
            .sort({ vote: -1, createdAt: -1 })
            .select(['book_name', 'slug', 'category', 'hide', 'isConfirm', 'createdAt'])
            .populate('category', ['short_name', 'tag_color'])
            .skip((page * limit) - limit)
            .limit(limit)
            .lean();

        totalBooks = await totalBooks.countDocuments();



        const bookPage = {
            data: bookResult,
            total_page: Math.ceil(totalBooks / limit),
            page,
            limit,
        };

        bookCategories = await BookCategory.find({});

        response.render('user-cms/review-book-management', {
            bookPage,
            bookCategories,
            params,
            link,
            totalBooks,
        });

    } catch (error) {
        console.log(error)
        response.render('500');
    }

}

async function getCreate(request, response) {
    try {
        const { id } = request.query;

        userProfile = request.user;

        bookCategories = await BookCategory.find({}).select(['name']);
        book = {};

        if (id) {
            book = await Book.findById(id);
        }

        return response.render('user-cms/create-review-book', {
            userProfile,
            bookCategories,
            book,
            id,
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

async function postCreate(request, response) {
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

        return response.redirect('/user-cms/book-review');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại.',
        }

        return response.redirect('back');
    }
}

async function postUpdate(request, response) {
    try {
        let { book_name, category, slug, review, id } = request.body;

        user = request.user;
        const BASE_URL = '/statics/uploads/users/' + user._id + '/reviews/';
        // const titleImage = BASE_URL + request.files[0].filename;
        // const bannerImage = BASE_URL + request.files[1].filename;
        // const smallImage = BASE_URL + request.files[2].filename;

        console.log(request.files);
        console.log(request.body.smallImage, request.body.titleImage, request.body.bannerImage);

        bookReview = await Book.findById(id);

        if (!bookReview) {
            request.session.message = {
                status: 'error',
                content: 'Không tìm thấy bài viết',
            }

            return response.redirect('back');
        }

        bookReview.book_name = book_name;
        bookReview.category = category;
        bookReview.slug = slug;
        bookReview.review = review;

        for (let i = 0; i < request.files.length; i++) {
            if (request.files[i].fieldname === 'titleImage') {
                bookReview.image.title = BASE_URL + request.files[i].filename;
            }
            if (request.files[i].fieldname === 'bannerImage') {
                bookReview.image.banner = BASE_URL + request.files[i].filename;
            }
            if (request.files[i].fieldname === 'smallImage') {
                bookReview.image.small = BASE_URL + request.files[i].filename;
            }
        }

        await bookReview.save();

        request.session.message = {
            status: 'success',
            content: 'Cập nhật bài thành công!',
        }

        return response.redirect('/user-cms/book-review');

    } catch (error) {
        console.log(error);

        request.session.message = {
            status: 'error',
            content: 'Có lỗi xảy ra, vui lòng thử lại.',
        }

        return response.redirect('back');
    }
}

async function deleteBookReview(request, response) {
    // Xóa reaction
    // Xóa comment
    // Xóa book
    const { id } = request.body;
    try {
        user = request.user;
        book = await Book.findOne({
            _id: id,
            reviewer: user._id,
        });
        if (!book) {
            response.status(HTTP.OK).json({
                status: HTTP.OK,
                error: true,
                message: 'Không tìm thấy bài review',
            });
        }

        await BookComment.deleteMany({
            book: id,
        });

        await Reaction.deleteMany({
            type: 'book',
            type_id: id,
        });

        await book.delete();

        response.status(HTTP.OK).json({
            status: HTTP.OK,
            error: false,
            message: 'Xóa bài thành công',
        });

    } catch (error) {
        response.status(HTTP.SERVER_ERROR).json({
            status: HTTP.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
    }
}

async function hideBookReview(request, response) {
    const { id } = request.body;
    try {
        user = request.user;
        book = await Book.findOne({
            _id: id,
            reviewer: user._id,
        });
        if (!book) {
            response.status(HTTP.OK).json({
                status: HTTP.OK,
                error: true,
                message: 'Không tìm thấy bài review',
            });
        }
        book.hide = !book.hide;

        await book.save();

        response.status(HTTP.OK).json({
            status: HTTP.OK,
            error: false,
            message: book.hide ? 'Ẩn thành công' : 'Bỏ ẩn thành công',
        });

    } catch (error) {
        response.status(HTTP.SERVER_ERROR).json({
            status: HTTP.SERVER_ERROR,
            error: true,
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
    }
}

module.exports = {
    index,
    getCreate,
    postCreate,
    deleteBookReview,
    hideBookReview,
    postUpdate,
}