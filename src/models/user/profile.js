const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    username: { type: String, default: '' },
    address: { type: String, default: '' },
    image: { type: String, default: '' },
    gender: { type: String, enum: ['men', 'women', 'third'], default: 'men' },
    birthday: { type: Date, default: Date.now() },
    introduction: { type: String, default: '' },
}, { timestamps: { currentTime: () => Date.now() } });

const Profile = mongoose.model('profiles', profileSchema);

module.exports = {
    Profile,
}

