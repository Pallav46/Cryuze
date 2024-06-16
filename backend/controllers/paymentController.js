const catchAsyncError = require("../middleware/catchAsyncError");
const Payment = require("../models/paymentModel"); // Ensure correct import based on your setup
const ServiceRequest = require("../models/serviceRequestModel")
const { instance } = require("../payment/payments");
const crypto = require("crypto");

var serviceRequestId;
// Endpoint to initiate a checkout session and create an order
exports.checkout = async (req, res) => {
  serviceRequestId = req.body.orderId;
  const options = {
    amount: Number(req.body.amount * 100), // Amount in paisa
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Could not create order",
      error: error.message,
    });
  }
};

// Endpoint to verify payment using Razorpay signature
exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;


  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  try {
    // Save payment details to your database
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { status: "accepted" },
      { new: true } // Return the updated document
    );

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service request not found.",
      });
    }

    // Redirect to a success page with the payment reference
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({
      success: false,
      message: "Could not save payment",
      error: error.message,
    });
  }
};

// Endpoint to retrieve Razorpay key from environment variables
exports.getKey = catchAsyncError(async (req, res, next) => {
  try {
    const key = process.env.RAZORPAY_KEY_ID;

    res.status(200).json({
      success: true,
      key,
    });
  } catch (error) {
    console.error("Error in retrieving Razorpay key:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Razorpay key.",
      error: error.message,
    });
  }
});
