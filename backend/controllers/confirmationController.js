const catchAsyncError = require("../middleware/catchAsyncError");
const Confirmation = require("../models/confirmationModel");

exports.askForConfirmation = catchAsyncError(async (req, res, next) => {
    const providerId = req.serviceProvider.id; // Assuming serviceProvider is available in req
    const { customerId, subcatId } = req.body;
    
    // Check if there's already a confirmation request for the same customer and subcategory
    let confirmation = await Confirmation.findOne({
        customerId,
        subcategoryId: subcatId,
    });

    if (confirmation) {
        // Check if the providerId already exists in the recipients array
        const isProviderExist = confirmation.recipients.some(recipient => recipient.providerId.equals(providerId));
        
        if (!isProviderExist) {
            // Add the new providerId to the recipients array if it doesn't exist
            confirmation.recipients.push({ providerId });
            await confirmation.save(); // Save the updated confirmation
            
            res.status(201).json({
                success: true,
                message: "Confirmation request successfully updated.",
                confirmation,
            });
        } else {
            // Provider has already been asked for confirmation
            res.status(200).json({
                success: true,
                message: "You have already asked this provider for confirmation.",
                confirmation,
            });
        }
    } else {
        // Create a new confirmation request
        // confirmation = new Confirmation({
        //     subcategoryId: subcatId,
        //     customerId,
        //     recipients: [{ providerId }],
        // });
        // await confirmation.save(); // Save the new confirmation
        
        res.status(404).json({
            success: false,
            message: "Order has been deleted"
            // confirmation,
        });
    }
});

exports.myOrders = catchAsyncError(async(req, res, next) => {
    const customerId = req.user.id; // Assuming req.user contains authenticated user's information
    
    // Fetch orders based on customerId, populate subcategory and provider details
    const orders = await Confirmation.find({ customerId })
        .populate({
            path: 'subcategoryId', // Populate subcategory details
        })
        .populate({
            path: 'recipients.providerId', // Populate provider details from ServiceProvider model
        });

    res.status(200).json({
        success: true,
        count: orders.length,
        orders,
    });
});


exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const orderId = req.params.id;

    const order = await Confirmation.findById(orderId);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }

    await Confirmation.deleteOne({ _id: orderId });

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});

