const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String, default: '' },
}, { timestamps: { currentTime: () => Date.now() } });

const Role = mongoose.model('roles', roleSchema);

module.exports = {
    roleSchema,
}

