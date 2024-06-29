const mongoose = require("mongoose");

// Define the schema for the Confirmation
const billSchema = new mongoose.Schema({
  subcategoryCharge: {
    type: Number,
    required: true,
  },
  serviceCharge: {
    type: Number,
    required: true,
  },
  additionalCharges: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Confirmation model
const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;
