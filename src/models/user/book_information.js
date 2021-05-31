const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookInformationSchema = new Schema({
}, { timestamps: { currentTime: () => Date.now() } });

const BookInformation = mongoose.model('book_informations', bookInformationSchema);

module.exports = {
    BookInformation,
}

