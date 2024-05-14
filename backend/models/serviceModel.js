const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.']
    },
    category: {
        type: String,
        required: [true, 'Category is required.']
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: [true, 'Provider is required.']
    },
    availability: {
        type: String,
        required: [true, 'Availability is required.']
    },
    location: {
        type: String
    }
});

module.exports = mongoose.model("Service", serviceSchema);