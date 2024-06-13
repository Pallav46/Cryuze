const ServiceRequest = require("../models/serviceRequestModel");
const Notification = require("../models/notificationModel");
const Confirmation = require("../models/confirmationModel");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create a new service request
exports.createServiceRequest = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user is authenticated and user ID is available in req.user
    const { confirmationId, providerId } = req.body;

    // Find the confirmation to get the subcategoryId
    const confirmation = await Confirmation.findById(confirmationId);
    if (!confirmation) {
      return res.status(404).json({
        success: false,
        message: "Confirmation not found.",
      });
    }

    const subcategoryId = confirmation.subcategoryId;

    // Find and delete the notification
    const notification = await Notification.findOneAndDelete({
      subcategory: subcategoryId,
      sender: userId,
    });
    if (!notification) {
      console.log("No notification found with given subcategory and sender.");
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    // Create a new service request
    const serviceRequest = new ServiceRequest({
      customer: userId,
      subCategory: subcategoryId,
      status: "pending", // Correct status to lowercase to match schema
      serviceProvider: providerId,
    });

    await serviceRequest.save();

    // Delete the confirmation
    await Confirmation.findByIdAndDelete(confirmationId);

    res.status(201).json({
      success: true,
      message: "Service request created successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the service request.",
      error: error.message,
    });
  }
};

// Get user's pending orders
exports.getUserOrder = catchAsyncError(async (req, res, next) => {
  const customer = req.user.id;
  const serviceRequests = await ServiceRequest.find({
    customer,
    status: "pending",
  })
    .populate({
      path: "subCategory", // Specify fields to select from SubCategory model
    })
    .populate({
      path: "serviceProvider", // Specify fields to select from ServiceProvider model
    });
  res.status(200).json({
    success: true,
    count: serviceRequests.length,
    data: serviceRequests,
  });
});

// Get user's accepted orders (history)
exports.getUserHistory = catchAsyncError(async (req, res, next) => {
  const provider = req.user.id;
  const serviceRequests = await ServiceRequest.find({
    provider,
    status: "accepted",
  });

  res.status(200).json({
    success: true,
    count: serviceRequests.length,
    serviceRequests,
  });
});

exports.getProviderWorks = catchAsyncError(async (req, res, next) => {
    const serviceProvider = req.serviceProvider.id;
  
    try {
      const serviceRequests = await ServiceRequest.find({
        serviceProvider,
        status: "pending",
      })
      .populate({
        path: "subCategory",
      })
      .populate({
        path: "customer", // Assuming 'user' in the model is 'customer'
      });
  
      res.status(200).json({
        success: true,
        count: serviceRequests.length,
        data: serviceRequests,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch provider's pending orders",
        error: err.message,
      });
    }
  });
