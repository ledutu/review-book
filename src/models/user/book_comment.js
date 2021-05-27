const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');
const { Book } = require('./book');

const bookCommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User },
    content: { type: String, require: true },
    book: { type: Schema.Types.ObjectId, ref: 'books' },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const BookComment = mongoose.model('book_comments', bookCommentSchema);

module.exports = {
    BookComment,
}

