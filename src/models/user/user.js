const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, default: '' },
    email: { type: String, default: '', unique: true },
    full_name: { type: String, default: '' },
    address: { type: String, default: '' },
    password: { type: String, select: false, required: true },
    password_not_hash: { type: String, select: false, required: true },
    image: { type: String, default: '' },
    user_follow: [Number],
    block: { type: Boolean, default: false },
});

const User = mongoose.model('users', userSchema);

//Create new function
userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email }).exec(function (err, user) {
        if (err) return callback(err);
        else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) return callback(null, user);
            else return callback();
        })
    })
}

module.exports = {
    User,
}

