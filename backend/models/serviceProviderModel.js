const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        type: { type: String, default: 'Point', enum: ['Point'] },
        coordinates: { type: [Number], required: true },
      },
    },
    services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
});

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
