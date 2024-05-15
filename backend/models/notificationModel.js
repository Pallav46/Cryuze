const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['serviceRequest', 'review'], required: true },
    read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', notificationSchema);