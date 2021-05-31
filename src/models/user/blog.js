const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');

const blogSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    blogger: { type: Schema.Types.ObjectId, ref: User },
    vote: { type: Number, default: 0 },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const Blog = mongoose.model('blogs', blogSchema);

module.exports = {
    Blog,
}
