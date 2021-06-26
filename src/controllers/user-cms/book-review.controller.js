const { BookCategory } = require('../../models/user/book_category');
const { Book } = require('../../models/user/book');

async function index(request, response) {
    try {
        
        response.render('user-cms/review-book-management');
    } catch (error) {
        
    }
    
}

async function getCreate(request, response) {
    try {

        userProfile = request.user;

        bookCategories = await BookCategory.find({}).select(['name']);

        return response.render('user-cms/create-review-book', {
            userProfile,
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

async function deleteBookReview(request, response) {
    console.log(request.body);
    
    response.status(200).json({ok: 'ok'})
}

module.exports = {
    index,
    getCreate,
    postCreate,
    deleteBookReview,
}