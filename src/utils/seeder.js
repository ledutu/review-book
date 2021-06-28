var faker = require('faker');
const { User } = require('../models/user/user');
const { Profile } = require('../models/user/profile');
const { Book } = require('../models/user/book');
const { BookCategory } = require('../models/user/book_category');
const { Blog } = require('../models/user/blog');
const { BookComment } = require('../models/user/book_comment');
const { BlogComment } = require('../models/user/blog_comment');
const { BlogTag } = require('../models/user/blog_tag');
const { Reaction } = require('../models/user/reaction');
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
            email: faker.internet.email().toLowerCase(),
            password: hashPassword,
            password_not_hash: password,
            profile,
            favorite_writer: i > 0 ? [users[i - 1]._id] : [],
            // favorite_book: [],
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
            isConfirm: true,
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
 * @function createBlogTag
 * @param {number} times 
 * @param {string} language
 * @return {Object} blogTags
 */
function createBlogTag(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    blogTags = [];
    const color = ['blue', 'green', 'yell', 'orange'];

    for (let i = 0; i < times; i++) {
        let word = faker.random.word()
        let tag = new BlogTag({
            name: word,
            tag_color: faker.helpers.randomize(color),
        });

        blogTags = [...blogTags, tag];
    }

    return { blogTags };
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
    const blogTags = await BlogTag.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id
        currentUser = await User.findById(_id).select('total_blog');
        currentUser.total_blog += 1;
        currentUser.save();

        _blogTagId = faker.helpers.randomize(blogTags)._id

        title = faker.name.title();
        let blog = new Blog({
            title,
            content: faker.lorem.paragraphs(40),
            tag: [_blogTagId],
            blogger: _id,
            slug: faker.helpers.slugify(title.toLowerCase()),
            isConfirm: true,
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

/**
 * @function createBookVote
 * @param {number} times 
 * @param {string} language
 * @return {Object} bookVotes
 */
async function createBookVote(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    bookVotes = [];

    const users = await User.find({}).select('_id').limit(times);
    const books = await Book.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id;
        book_id = faker.helpers.randomize(books)._id
        rate = faker.helpers.randomize([1, 2, 3, 4, 5]);
        
        vote = await Reaction.findOne({
            type: 'book',
            user: _id,
            type_id: book_id,
        });
        
        if(vote) continue;

        let bookVote = new Reaction({
            rate,
            type: 'book',
            user: _id,
            type_id: book_id,
        });

        bookVotes = [...bookVotes, bookVote];
    }
    
    console.log(bookVotes.length);

    return { bookVotes };
}

/**
 * @function createBlogVote
 * @param {number} times 
 * @param {string} language
 * @return {Object} blogVotes
 */
async function createBlogVote(times = 5, language) {
    if (language) {
        faker.locale = language;
    }

    blogVotes = [];

    const users = await User.find({}).select('_id').limit(times);
    const blogs = await Blog.find({}).select('_id').limit(times);

    for (let i = 0; i < times; i++) {
        _id = faker.helpers.randomize(users)._id;
        blog_id = faker.helpers.randomize(blogs)._id;
        vote = await Reaction.findOne({
            type: 'blog',
            user: _id,
            type_id: blog_id,
        });
        
        if(vote) continue;
        
        rate = faker.helpers.randomize([1, 2, 3, 4, 5]);

        let blogVote = new Reaction({
            rate,
            type: 'blog',
            user: _id,
            type_id: blog_id,
        });

        blogVotes = [...blogVotes, blogVote];
    }

    console.log(blogVotes.length);
    
    return { blogVotes };
}

/**
 * @function calculateRating
 */
async function calculateRating() {
    books = await Book.find({}).select(['vote']);
    blogs = await Blog.find({}).select(['vote']);

    books.forEach(async book => {
        let mean = await getMean(book._id);
        book.vote = mean;
        await book.save();
    });

    blogs.forEach(async blog => {
        let mean = await getMean(blog._id);
        blog.vote = mean;
        await blog.save();
    });
}

/**
 * @function getMean
 * @param {ObjectId} id 
 * @return mean,
 */
async function getMean(id) {
    reactions = await Reaction.find({ type_id: id }).select(['rate']);

    let total = 0;
    reactions.forEach(reaction => {
        total += reaction.rate;
    });

    mean = 0;
    if (reactions.length) {
        mean = total / reactions.length;
    }

    return mean.toFixed(2);
}

const Seeder = {
    createUserDatabaseSeed,
    createBookWithoutCategoryDbSeed,
    createBookWithCategoryDbSeed,
    createBookCategory,
    createBlog,
    createBookComment,
    createBlogComment,
    createBlogTag,
    createBookVote,
    createBlogVote,
    calculateRating,
    getMean,
}

module.exports = Seeder