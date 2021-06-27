const mongoose = require('mongoose');
const { Schema } = mongoose;

const color = ['blue', 'green', 'yell', 'orange'];

const blogTagSchema = new Schema({
    name: { type: String, require: true },
    tag_color: { type: String, enum: color, default: 'orange' },
    block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const BlogTag = mongoose.model('blog_tags', blogTagSchema);

module.exports = {
    BlogTag,
}

