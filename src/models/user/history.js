const mongoose = require('mongoose');
const { Schema } = mongoose;
const { HistoryAction } = require('./history_action');

const historySchema = new Schema({
    action: { type: Schema.Types.ObjectId, ref: HistoryAction },
    comment: { type: String, require: true },
    hide: { type: Boolean, default: false },
}, { timestamps: { currentTime: () => Date.now() } });

const History = mongoose.model('histories', historySchema);

module.exports = {
    History,
}

