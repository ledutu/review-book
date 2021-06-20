const mongoose = require('mongoose');
const { Schema } = mongoose;
const { User } = require('./user');

const reactionSchema = new Schema({
    rate: { type: Number, enum: [1, 2, 3, 4, 5], default: 5 },
    type: { type: String, enum: ['book', 'blog'], default: 'book' },
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    type_id: { type: Schema.Types.ObjectId },
}, { timestamps: { currentTime: () => Date.now() } });

const Reaction = mongoose.model('reactions', reactionSchema);

module.exports = {
    Reaction,
}

