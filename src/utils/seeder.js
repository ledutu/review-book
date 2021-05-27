var faker = require('faker');
const { User } = require('../models/user/user');
const { Profile } = require('../models/user/profile');
const { Book } = require('../models/user/book');
const { BookCategory } = require('../models/user/book_category');
const { Blog } = require('../models/user/blog');
const { BookComment } = require('../models/user/book_comment');
const { BlogComment } = require('../models/user/blog_comment');
var bcrypt = require('bcrypt');

/**
 * @function createUserDatabaseSeed
 * @param {number} times 
 * @param {string} language
 * @return {Object} users, profiles
 */
function createUserDatabaseSeed(times = 5, language) {
    if (language) {
        faker.locale = language;
    }
    users = [];
    profiles = [];

    for (let i = 0; i < times; i++) {
        //Create profile
        genders = ['men', 'women', 'third']
        random = Math.floor(Math.random() * 3);
        let profile = new Profile({
            username: faker.internet.userName(),
            full_name: faker.name.findName(),
            address: faker.address.city(),
            gender: genders[random],
            image: faker.internet.avatar(),
            birthday: faker.date.past(),
            introduction: faker.lorem.sentences(5),
        });

        let password = faker.internet.password(6);
        let hashPassword = bcrypt.hashSync(password, 12);
        let user = new User({
            email: faker.internet.email(),
            password: hashPassword,
            password_not_hash: password,
            profile: profile._id,
            favorite_writer: i > 0 ? [users[i - 1]._id] : [],
            favorite_book: [],
        })
        users = [...users, user];
        profiles = [...profiles, profile];
    }

    return { users, profiles };
}

/**
 * @function createBookWithoutCategoryDbSeed
 * @param {number} times 
 * @param {string} language
 * @return {Object} books
 */
async function createBookWithoutCategoryDbSeed(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    books = [];
    const users = await User.find({}).select('_id').limit(times);
    const bookCategories = await BookCategory.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        let length = users.length;
        if (length === times) {
            _id = users[i]._id;
        } else {
            if (length > 0) {
                let index = parseInt(times / length + i);
                _id = users[index < length - 1 ? index : 0]._id;
            } else {
                _id = null;
            }
        }

        if (bookCategories.length > 0) {
            if (bookCategories.length === times) {
                category_id = bookCategories[i]._id;
            } else {
                let index = parseInt(times / bookCategories.length + i);
                category_id = bookCategories[index < bookCategories.length - 1 ? index : 0]._id;
            }
        }

        let book = new Book({
            book_name: faker.name.title(),
            review: faker.lorem.paragraphs(3),
            reviewer: _id,
            image: {
                title: faker.image.image(340, 521),
                banner: faker.image.image(285, 437),
                small: faker.image.image(185, 284),
            },
            category: [category_id],
        });

        books = [...books, book];
    }

    return { books };
}

/**
 * @function createBookWithCategoryDbSeed
 * @param {number} times 
 * @param {string} language
 * @return {Object} books, bookCategories,
 */

async function createBookWithCategoryDbSeed(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    books = [];
    bookCategories = [];

    const users = await User.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let category = new BookCategory({
            name: word,
            short_name: word,
        });

        let length = users.length;

        if (length === times) {
            _id = users[i]._id;
        } else {
            if (length > 0) {
                let index = parseInt(times / length + i);
                _id = users[index < length - 1 ? index : 0]._id;
            } else {
                _id = null;
            }
        }

        let book = new Book({
            book_name: faker.name.title(),
            review: faker.lorem.paragraphs(3),
            reviewer: _id,
            image: {
                title: faker.image.image(340, 521),
                banner: faker.image.image(285, 437),
                small: faker.image.image(185, 284),
            },
            category: [category._id],
        });

        books = [...books, book];
        bookCategories = [...bookCategories, category];
    }

    return { books, bookCategories }
}

/**
 * @function createBookCategroy
 * @param {number} times 
 * @param {string} language
 * @return {Object} bookCategories
 */
function createBookCategory(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    bookCategories = [];
    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let category = new BookCategory({
            name: word,
            short_name: word,
        });

        bookCategories = [...bookCategories, category];
    }

    return { bookCategories };
}

/**
 * @function createBlog
 * @param {number} times 
 * @param {string} language
 * @return {Object} blogs
 */
async function createBlog(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    blogs = [];

    const users = await User.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        let length = users.length;
        if (length === times) {
            _id = users[i]._id;
        } else {
            if (length > 0) {
                let index = parseInt(times / length + i);
                _id = users[index < length - 1 ? index : 0]._id;
            } else {
                _id = null;
            }
        }
        let blog = new Blog({
            title: faker.name.title(),
            content: faker.lorem.paragraphs(5),
            blogger: _id,
        });

        blogs = [...blogs, blog];
    }

    return { blogs };
}

/**
 * @function createBookComment
 * @param {number} times 
 * @param {string} language
 * @return {Object} bookComments
 */
async function createBookComment(times = 5, language) {
    if (language) {
        faker.locale = language;
    }
    bookComments = [];

    const users = await User.find({}).select('_id').limit(times);
    const books = await Book.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        /**Get User Id */
        let length = users.length;
        if (length === times) {
            _id = users[i]._id;
        } else {
            if (length > 0) {
                let index = parseInt(times / length + i);
                _id = users[index < length - 1 ? index : 0]._id;
            } else {
                _id = null;
            }
        }

        /**Get book_id */
        if (books.length === times) {
            book_id = books[i]._id;
        } else {
            if (books.length > 0) {
                let index = parseInt(times / books.length + i);
                book_id = books[index < books.length - 1 ? index : 0]._id;
            } else {
                book_id = null;
            }
        }

        let bookComment = new BookComment({
            user: _id,
            content: faker.lorem.sentence(),
            book: book_id,
        });

        bookComments = [...bookComments, bookComment];
    }

    return { bookComments };
}

/**
 * @function createBlogComment
 * @param {number} times 
 * @param {string} language
 * @return {Object} blogComments
 */
async function createBlogComment(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    blogComments = [];

    const users = await User.find({}).select('_id').limit(times);
    const blogs = await Blog.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        /**Get User Id */
        let length = users.length;
        if (length === times) {
            _id = users[i]._id;
        } else {
            if (length > 0) {
                let index = parseInt(times / length + i);
                _id = users[index < length - 1 ? index : 0]._id;
            } else {
                _id = null;
            }
        }

        /**Get book_id */
        if (blogs.length === times) {
            blog_id = blogs[i]._id;
        } else {
            if (blogs.length > 0) {
                let index = parseInt(times / blogs.length + i);
                blog_id = blogs[index < blogs.length - 1 ? index : 0]._id;
            } else {
                blog_id = null;
            }
        }

        let blogComment = new BlogComment({
            user: _id,
            content: faker.lorem.sentence(),
            blog: blog_id,
        });

        blogComments = [...blogComments, blogComment];
    }

    return { blogComments };
}

const Seeder = {
    createUserDatabaseSeed,
    createBookWithoutCategoryDbSeed,
    createBookWithCategoryDbSeed,
    createBookCategory,
    createBlog,
    createBookComment,
    createBlogComment,
}

module.exports = Seeder