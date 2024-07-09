const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProvider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
});

module.exports = mongoose.model('Review', reviewSchema);