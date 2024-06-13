const catchAsyncError = require("../middleware/catchAsyncError");
const ServiceProvider = require("../models/serviceProviderModel");
const SubCategory = require("../models/subCategoryModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Confirmation = require("../models/confirmationModel");
const { sendMessageToUser } = require("../socket/socket");

exports.sendNotification = catchAsyncError(async (req, res, next) => {
    try {
        const senderId = req.user.id;
        const subcatId = req.params.subcatId;
        const { serviceProviderIds, message } = req.body;

        // Find the sender (user) and check if they exist
        const sender = await User.findById(senderId);
        if (!sender) {
            return next(new Error("Sender not found"));
        }

        // Ensure subcategory exists
        const subcategory = await SubCategory.findById(subcatId);
        if (!subcategory) {
            return next(new Error("Subcategory not found"));
        }

        // Find the recipients (service providers) and check if they exist
        const recipients = await ServiceProvider.find({ _id: { $in: serviceProviderIds } });
        if (recipients.length !== serviceProviderIds.length) {
            return next(new Error("One or more recipients not found"));
        }

        // Create a new notification document
        const notification = await Notification.create({
            message,
            subcategory: subcatId,
            sender: senderId,
            recipients: recipients.map((recipient) => ({ providerId: recipient._id })),
        });

        // Create a confirmation record
        const confirmation = await Confirmation.create({
            subcategoryId: subcatId,
            customerId: senderId,
        });

        // Prepare the notification object to be sent via WebSocket
        const newNotification = {
            message,
            sender: { _id: sender._id, name: sender.name, email: sender.email },
            subcategory: { _id: subcategory._id, name: subcategory.name },
        };

        // Send the notification to each service provider
        serviceProviderIds.forEach((serviceProviderId) => {
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