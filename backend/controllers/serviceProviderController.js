const ServiceProvider = require("../models/serviceProviderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// CREATE SERVICE PROVIDER
exports.createServiceProvider = catchAsyncError(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    altPhoneNumber,
    rating,
    reviews,
    location,
    services,
  } = req.body;
  console.log(req.body);
  const serviceProvider = await ServiceProvider.create({
    name,
    email,
    password,
    phoneNumber,
    altPhoneNumber,
    rating,
    reviews,
    location,
    services,
  });

  console.log(serviceProvider);

  sendToken(serviceProvider, 201, res);
});

// Login service provider
exports.loginServiceProvider = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const serviceProvider = await ServiceProvider.findOne({ email }).select(
    "+password"
  );

  if (!serviceProvider || !(await serviceProvider.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(serviceProvider, 201, res);
});

// Logout service provider
exports.logoutServiceProvider = catchAsyncError(async (req, res, next) => {
  // Clear cookie with the token
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res
    .status(200)
    .json({
      success: true,
      message: "ServiceProvider logged out successfully",
    });
});

// ForgotPassword for service provider
exports.forgotPasswordServiceProvider = catchAsyncError(
  async (req, res, next) => {
    // Find serviceProvider by email
    const serviceProvider = await ServiceProvider.findOne({
      email: req.body.email,
    });
    if (!serviceProvider) {
      return next(
        new ErrorHandler("serviceProvider not found with this email", 404)
      );
    }

    // Generate reset password token
    const resetToken = serviceProvider.getResetPasswordToken();

    // Save serviceProvider with reset token (disable validation for now)
    await serviceProvider.save({ validateBeforeSave: false });

    // Create reset password URL
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/providers/auth/resetpassword/${resetToken}`;

    // Email message
    const message = `Your password reset token is: \n\n ${resetURL} \n\n If you have not reuested this email then, please ignore it`;

    try {
      // Send email
      await sendEmail({
        email: serviceProvider.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({
        success: true,
        message: "Email sent with password reset instructions",
      });
    } catch (error) {
      serviceProvider.resetPasswordToken = undefined;
      serviceProvider.resetPasswordExpire = undefined;
      await serviceProvider.save({ validateBeforeSave: false });
      console.log(error);
      return next(
        new ErrorHandler(
          "Email could not be sent. Please try again later.",
          500
        )
      );
    }
  }
);

// ResetPassword
exports.resetPasswordServiceProvider = catchAsyncError(async (req, res, next) => {
  // Get reset token from URL parameters
  const resetToken = req.params.token;

  // Hash the reset token to match with the stored hashed token in the database
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find serviceProvider by the hashed reset token and check if the token has expired
  const serviceProvider = await ServiceProvider.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if the token expiration date is greater than the current date
  });

  if (!serviceProvider) {
    // If serviceProvider not found or token has expired
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }

  // Check if both password and confirm password are provided
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return next(
      new ErrorHandler("Please provide both password and confirm password", 400)
    );
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Set the new password
  serviceProvider.password = password;
  serviceProvider.resetPasswordToken = undefined; // Clear the reset token
  serviceProvider.resetPasswordExpire = undefined; // Clear the reset token expiration date
  await serviceProvider.save(); // Save the serviceProvider with the new password

  // Send token to the serviceProvider
  sendToken(serviceProvider, 200, res);
});

// GET ALL SERVICE PROVIDERS
exports.getAllServiceProvider = async (req, res) => {
  try {
    const serviceProviders = await ServiceProvider.find();
    res.status(200).json({ success: true, data: serviceProviders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch service providers" });
  }
};

// GET SERVICE PROVIDER BY ID
exports.getServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceProvider = await ServiceProvider.findById(id).select("-password");
    
    if (!serviceProvider) {
      return res
        .status(404)
        .json({ success: false, message: "Service provider not found" });
    }
    // Check the structure of serviceProvider and make sure it includes the required properties

    res.status(200).json(serviceProvider);

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch service provider" });
  }
};

// Update password for service provider
exports.updateServiceProviderPassword = catchAsyncError(async (req, res, next) => {
    // Get the current serviceProvider
    const serviceProvider = await ServiceProvider.findById(req.serviceProvider.id).select("+password");
    // Check if both current password, new password, and confirm new password are provided
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return next(
        new ErrorHandler(
          "Please provide current password, new password, and confirm new password",
          400
        )
      );
    }
  
    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      return next(
        new ErrorHandler(
          "New password and confirm new password do not match",
          400
        )
      );
    }
  
    // Check if the current password matches the serviceProvider's password
    const isPasswordMatch = await serviceProvider.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Incorrect current password", 400));
    }
  
    // Set the new password
    serviceProvider.password = newPassword;
    await serviceProvider.save(); // Save the serviceProvider with the new password
  
    // Send token to the serviceProvider
    sendToken(serviceProvider, 200, res);
});

// Get Details of a service provider
exports.getServiceProviderDetail = catchAsyncError(async (req, res, next) => {
    const serviceProvider = await ServiceProvider.findById(req.serviceProvider.id);
    if (!serviceProvider) {
      return next(new ErrorHandler("serviceProvider not found", 404));
    }
    res.status(200).json({ success: true, data: serviceProvider });
});

// Update profile of a service provider
exports.updateServiceProviderProfile = catchAsyncError(async (req, res, next) => {
    // Get the current serviceProvider
    const newserviceProviderData = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      altPhoneNumber: req.body.altPhoneNumber,
    };
  
    // Update serviceProvider data
    const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.serviceProvider.id, newserviceProviderData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    sendToken(serviceProvider, 200, res);
});

exports.updateServiceProviderService = catchAsyncError(async (req, res, next) => {
    const serviceProvider = await ServiceProvider.findById(req.serviceProvider.id);
    if (!serviceProvider) {
        return next(new ErrorHandler("serviceProvider not found", 404));
    }
    serviceProvider.services = req.body.services;
    await serviceProvider.save();
    
    sendToken(serviceProvider, 200, res);
});

exports.getServiceProviderService = catchAsyncError(async (req, res, next) => {
  
  const serviceProvider = await ServiceProvider.findById(req.serviceProvider.id).populate('services');
  if (!serviceProvider) {
    return next(new ErrorHandler("serviceProvider not found", 404));
  }
  res.status(200).json({ success: true, data: serviceProvider.services });
})

// UPDATE SERVICE PROVIDER BY ID
exports.updateServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedServiceProvider) {
      return res
        .status(404)
        .json({ success: false, message: "Service provider not found" });
    }
    res.status(200).json({ success: true, data: updatedServiceProvider });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update service provider" });
  }
};

// DELETE SERVICE PROVIDER BY ID
exports.deleteServiceProviderById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(id);
    if (!deletedServiceProvider) {
      return res
        .status(404)
        .json({ success: false, message: "Service provider not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Service provider deleted successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete service provider" });
  }
};
