const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [25, "Name can't exceed 25 characters"],
    minlength: [2, "Name should have more than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email must be unique."],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phoneNumber: { type: String, required: [true, "Phone number is required"] },
  altPhoneNumber: { type: String },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  rating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  location: {
    address: { type: String, required: [true, "Address is required"] },
    city: { type: String, required: [true, "City is required"] },
    state: { type: String, required: [true, "State is required"] },
    coordinates: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: {
        type: [Number],
        required: [true, "Coordinates are required"],
      },
    },
  },
  services: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

serviceProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// JWT Token
serviceProviderSchema.methods.getJWTToken = function () {
  // Set token expiration (optional)
  const expirationTime = process.env.JWT_EXPIRATION || "1h"; // Default to 1 hour

  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });
};

// Compare Password
serviceProviderSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generating Password reset token
serviceProviderSchema.methods.getResetPasswordToken = function () {
  // Generate reset password token
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);
