const mongoose = require("mongoose");

// Define the schema for the Confirmation
const confirmationSchema = new mongoose.Schema({
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipients: [
    {
      providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true,
      },
    },
  ],
});

// Create the Confirmation model
const Confirmation = mongoose.model("Confirmation", confirmationSchema);

module.exports = Confirmation;
