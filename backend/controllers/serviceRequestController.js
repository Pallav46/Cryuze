const ServiceRequest = require("../models/serviceRequestModel");
const Notification = require("../models/notificationModel");
const Confirmation = require("../models/confirmationModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Bill = require("../models/billModel");

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
exports.getUserAllOrder = catchAsyncError(async (req, res, next) => {
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
    })
    
  res.status(200).json({
    success: true,
    count: serviceRequests.length,
    data: serviceRequests,
  });
});

// Get a specific work by ID for the service provider
exports.getUserOrder = catchAsyncError(async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const work = await ServiceRequest.findById(orderId)
      .populate({
        path: "subCategory",
      })
      .populate({
        path: "serviceProvider",
      })
      .populate({
        path: "bill"
      });
    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: work,
    });
  } catch (err) {
    next(err);
  }
});

// Get user's accepted orders (history)
exports.getUserHistory = catchAsyncError(async (req, res, next) => {
  const customer = req.user.id;
  const serviceRequests = await ServiceRequest.find({
    customer,
    status: "accepted",
  })
  .populate("serviceProvider")
  .populate("bill")
  .populate("subCategory");
  
  res.status(200).json({
    success: true,
    count: serviceRequests.length,
    serviceRequests,
  });
});

exports.getProviderAllWork = catchAsyncError(async (req, res, next) => {
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

// Get a specific work by ID for the service provider
exports.getProviderWork = catchAsyncError(async (req, res, next) => {
  const workId = req.params.workId;
  
  try {
    const work = await ServiceRequest.findById(workId)
      .populate({
        path: "subCategory",
      })
      .populate({
        path: "customer", // Assuming 'user' in the model is 'customer'
      });
    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work not found.",
      });
    }
    // console.log("hii");
    res.status(200).json({
      success: true,
      data: work,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

exports.sendBill = catchAsyncError(async (req, res, next) => {
  try {
    const {
      serviceRequestId,
      subcategoryCharge,
      serviceCharge,
      additionalCharges,
    } = req.body;
    // console.log("hii");
    // Check if the ServiceRequest already has a bill associated
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    if (!serviceRequest) {
      return res.status(404).json({ error: "ServiceRequest not found" });
    }

    if (serviceRequest.bill) {
      return res
        .status(400)
        .json({ error: "ServiceRequest already has a bill associated" });
    }

    // Create a new Bill document
    const bill = new Bill({
      subcategoryCharge,
      serviceCharge,
      additionalCharges,
    });

    // Save the bill
    await bill.save();

    // Associate the bill with the serviceRequest
    serviceRequest.bill = bill._id; // Assuming bill._id is the ObjectId of the newly created bill

    // Save the updated serviceRequest
    await serviceRequest.save();

    // Send a response indicating success
    res.status(200).json({ message: "Bill sent successfully", bill });
  } catch (e) {
    console.log(e);
  }
});