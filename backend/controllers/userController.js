const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendToken }= require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  // console.log(req.body);
  const user = await User.create({
    name,
    email,
    password,
    phoneNumber,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicurl",
    },
  });
  console.log(user);
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  // Clear cookie with the token
  res.cookie("usertoken", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Generate reset password token
  const resetToken = user.getResetPasswordToken();

  // Save user with reset token (disable validation for now)
  await user.save({ validateBeforeSave: false });

  // Create reset password URL
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  // Email message
  const message = `Your password reset token is: \n\n ${resetURL} \n\n If you have not reuested this email then, please ignore it`;

  try {
    // Send email
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent with password reset instructions",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new ErrorHandler("Email could not be sent. Please try again later.", 500)
    );
  }
});

// ResetPassword
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Get reset token from URL parameters
  const resetToken = req.params.token;

  // Hash the reset token to match with the stored hashed token in the database
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find user by the hashed reset token and check if the token has expired
  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpire: { $gt: Date.now() }, // Check if the token expiration date is greater than the current date
  });

  if (!user) {
    // If user not found or token has expired
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
  user.password = password;
  user.resetPasswordToken = undefined; // Clear the reset token
  user.resetPasswordExpire = undefined; // Clear the reset token expiration date
  await user.save(); // Save the user with the new password

  // Send token to the user
  sendToken(user, 200, res);
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({ success: true, data: user });
});

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  // Get the current user
  const user = await User.findById(req.user.id).select("+password");

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

  // Check if the current password matches the user's password
  const isPasswordMatch = await user.comparePassword(currentPassword);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Incorrect current password", 400));
  }

  // Set the new password
  user.password = newPassword;
  await user.save(); // Save the user with the new password

  // Send token to the user
  sendToken(user, 200, res);
});

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  // Get the current user
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };

  // Update user data
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  sendToken(user, 200, res);
});

exports.getUserLoginOrNot = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
  });
});

exports.deleteUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});
