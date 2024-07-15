const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ServiceProvider = require("../models/serviceProviderModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // Check if token is available in request cookies
  const { usertoken } = req.cookies;

  if (!usertoken) {
    return next(new ErrorHandler("Please log in to access this resource", 401));
  }

  const decoded = jwt.verify(usertoken, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.isAuthenticatedServiceProvider = catchAsyncError(async (req, res, next) => {
  // Check if token is available in request cookies
  const { providertoken } = req.cookies;
  
  if (!providertoken) {
    return next(new ErrorHandler("Please log in to access this resource", 401));
  }

  const decoded = jwt.verify(providertoken, process.env.JWT_SECRET);
  req.serviceProvider = await ServiceProvider.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
      return next(new ErrorHandler("Unauthorized access", 401));
    }

    // Check if user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("You are not authorized to access this resource", 403)
      );
    }

    next();
  };
};
