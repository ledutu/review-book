const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Profile } = require('./profile');
const { Book } = require('./book');

const userSchema = new Schema({
    google_id: { type: String, default: '' },
    facebook_id: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, select: false },
    password_not_hash: { type: String, select: false },
    profile: { type: Schema.Types.ObjectId, ref: Profile },
    favorite_writer: [this],
    favorite_book: [{ type: Schema.Types.ObjectId, ref: Book }],
    block: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const User = mongoose.model('users', userSchema);

//Create new function
// userSchema.statics.authenticate = function (email, password, callback) {
//     User.findOne({ email }).exec(function (err, user) {
//         if (err) return callback(err);
//         else if (!user) {
//             var err = new Error('User not found.');
//             err.status = 401;
//             return callback(err);
//         }

//         bcrypt.compare(password, user.password, function (err, result) {
//             if (result) return callback(null, user);
//             else return callback();
//         })
//     })
// }

module.exports = {
    User,
}

