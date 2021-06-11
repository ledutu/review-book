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

        let profile = {
            username: faker.internet.userName().toLowerCase(),
            full_name: faker.name.findName(),
            address: faker.address.city(),
            gender: genders[random],
            image: faker.internet.avatar(),
            birthday: faker.date.past(),
            introduction: faker.lorem.sentences(5),
        }

        let password = faker.internet.password(6);
        let hashPassword = bcrypt.hashSync(password, 12);
        let user = new User({
            email: faker.internet.email(),
            password: hashPassword,
            password_not_hash: password,
            profile,
            favorite_writer: i > 0 ? [users[i - 1]._id] : [],
            favorite_book: [],
        })
        users = [...users, user];
        // profiles = [...profiles, profile];
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
        _id = faker.helpers.randomize(users)._id
        category_id = faker.helpers.randomize(bookCategories)._id

        currentUser = await User.findById(_id).select('total_book');
        currentUser.total_book += 1;
        currentUser.save();
        book_name = faker.name.title();
        let book = new Book({
            book_name,
            review: faker.lorem.paragraphs(20),
            reviewer: _id,
            image: {
                title: faker.image.image(340, 521),
                banner: faker.image.image(285, 437),
                small: faker.image.image(185, 284),
            },
            category: [category_id],
            slug: faker.helpers.slugify(book_name.toLowerCase()),
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

    const color = ['blue', 'green', 'yell', 'orange'];

    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let category = new BookCategory({
            name: word,
            tag_color: faker.helpers.randomize(color),
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
        _id = faker.helpers.randomize(users)._id
        currentUser = await User.findById(_id).select('total_blog');
        currentUser.total_blog += 1;
        currentUser.save();

        title = faker.name.title();
        let blog = new Blog({
            title,
            content: faker.lorem.paragraphs(40),
            blogger: _id,
            slug: faker.helpers.slugify(title.toLowerCase()),
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
        _id = faker.helpers.randomize(users)._id;
        book_id = faker.helpers.randomize(books)._id
        
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
        _id = faker.helpers.randomize(users)._id;
        blog_id = faker.helpers.randomize(blogs)._id

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