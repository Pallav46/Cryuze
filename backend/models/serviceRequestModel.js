const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceRequestSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subCategory: {
    type: Schema.Types.ObjectId, ref: "SubCategory", required: true,
  },
  status: {
    type: String, enum: ["pending", "completed"], default: "pending",
  },
  serviceProvider: { type: Schema.Types.ObjectId, ref: "ServiceProvider" },
  bill: { type: Schema.Types.ObjectId, ref: "Bill" }, // Reference to Bill schema
}, { timestamps: true });  // Enable timestamps

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
