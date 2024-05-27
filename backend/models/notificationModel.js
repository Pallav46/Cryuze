// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const notificationSchema = new Schema({
//     recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     message: { type: String, required: true },
//     type: { type: String, enum: ['serviceRequest', 'review'], required: true },
//     read: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('Notification', notificationSchema);

const mongoose = require('mongoose');

// Define the schema for the notification
const notificationSchema = new mongoose.Schema({
  message: {
    type: String
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [
    {
      providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
      }
    }
  ]
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
