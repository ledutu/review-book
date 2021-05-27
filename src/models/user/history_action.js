const mongoose = require('mongoose');
const { Schema } = mongoose;

const historyActionSchema = new Schema({
    name: { type: String, require: true },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const HistoryAction = mongoose.model('history_actions', historyActionSchema);

module.exports = {
    HistoryAction,
}

