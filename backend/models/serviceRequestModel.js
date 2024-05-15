const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceRequestSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    userLocation: {
      type: { type: String, default: 'Point', enum: ['Point'] },
      coordinates: { type: [Number], required: true },
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'completed', 'canceled'], default: 'pending' },
    serviceProvider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider' },
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);