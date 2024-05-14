const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required.'],
        unique: [true, 'Name must be unique.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email must be unique.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    role: {
        type: String,
        enum: ['customer', 'service_provider', 'admin'],
        required: [true, 'Role is required.']
    },
    profile: {
        name: {
            type: String,
            default: ''
        },
        contact: String
    }
});

module.exports = mongoose.model("User", userSchema);