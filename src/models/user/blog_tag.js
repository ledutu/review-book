const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogTagSchema = new Schema({
    name: { type: String, require: true },
    block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const BlogTag = mongoose.model('blog_tags', blogTagSchema);

module.exports = {
    BlogTag,
}

