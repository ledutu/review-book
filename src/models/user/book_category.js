const mongoose = require('mongoose');
const { Schema } = mongoose;

const color = ['blue', 'green', 'yell', 'orange'];

const bookCategorySchema = new Schema({
    name: { type: String, default: '' },
    short_name: { type: String, default: '' },
    children: [this],
    visited: { type: Number, default: 0 },
    tag_color: { type: String, enum: color, default: 'orange' },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const BookCategory = mongoose.model('book_categories', bookCategorySchema);

module.exports = {
    BookCategory,
}

