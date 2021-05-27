const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');
const { Blog } = require('./blog');

const blogCommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User },
    content: { type: String, require: true },
    blog: { type: Schema.Types.ObjectId, ref: Blog },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const BlogComment = mongoose.model('blog_comments', blogCommentSchema);

module.exports = {
    BlogComment,
}

