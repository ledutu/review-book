const mongoose = require('mongoose');
const { Schema } = mongoose;
const { BookCategory } = require('./book_category');
const { BookInformation } = require('./book_information');

const bookSchema = new Schema({
    book_name: { type: String, require: true },
    review: { type: String, require: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
    image: {
        title: { type: String, default: '' },
        banner: { type: String, default: '' },
        small: { type: String, default: '' }
    },
    category: [{ type: Schema.Types.ObjectId, ref: BookCategory }],
    book_information: { type: Schema.Types.ObjectId, ref: BookInformation },
    slug: {type: String, default: ''},
    vote: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Book = mongoose.model('books', bookSchema);

module.exports = {
    Book,
}

