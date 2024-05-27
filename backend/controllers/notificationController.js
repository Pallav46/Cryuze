const catchAsyncError = require("../middleware/catchAsyncError");
const ServiceProvider = require("../models/serviceProviderModel");
const SubCategory = require("../models/subCategoryModel")
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const { sendMessageToUser } = require("../socket/socket");

exports.sendNotification = catchAsyncError(async (req, res, next) => {
    try {
      const senderId = req.user.id;
      const subcatId = req.params.subcatId;
      const { serviceProviderIds, message } = req.body;
  
      // Find the sender (user) and check if they exist
      const sender = await User.findById(senderId);
      if (!sender) {
        return next(new ErrorHandler("Sender not found", 404));
      }
  
      // Ensure subcategory exists
      const subcategory = await SubCategory.findById(subcatId);
      if (!subcategory) {
        return next(new ErrorHandler("Subcategory not found", 404));
      }
  
      // Find the recipients (service providers) and check if they exist
      const recipients = await ServiceProvider.find({ _id: { $in: serviceProviderIds } });
      if (recipients.length === 0) {
        return next(new ErrorHandler("No recipients found", 404));
      }
  
      // Create a new notification document
      const notification = await Notification.create({
        message,
        subcategory: subcatId,
        sender: senderId,
        recipients: recipients.map((recipient) => ({ providerId: recipient._id })),
      });
  
      // Prepare the notification object to be sent via WebSocket
      const newNotification = {
        message: message,
        sender: sender,
        subcategory: subcategory
      };
  
      // Send the notification to each service provider
      serviceProviderIds.forEach(serviceProviderId => {
        sendMessageToUser(serviceProviderId, "notification", newNotification);
      });
  
      res.status(200).json({
        success: true,
        message: "Notification sent successfully",
        notification,
      });
    } catch (err) {
      next(err);
    }
});



exports.getAllNotification = catchAsyncError(async (req, res, next) => {
  const providerId = req.serviceProvider.id;

  // Find all notifications for the service provider
  const notifications = await Notification.find({
    "recipients.providerId": providerId,
  }).populate("sender", "name email").populate("subcategory", "name");

  if (notifications.length === 0) {
    return res.status(200).json({
      notifications: []
    });
  }

  res.status(200).json({
    notifications
  });
});