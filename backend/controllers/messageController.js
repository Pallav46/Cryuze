const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.sendMessage = catchAsyncError(async (req, res, next) => {
    const { receiverId, message, userType } = req.body;
    const senderId = req.user.id; // Assuming you have user authentication middleware

    // Find or create the conversation between sender and receiver
    let conversation = await Conversation.findOneAndUpdate(
        { participants: { $all: [senderId, receiverId] } },
        { $setOnInsert: { participants: [senderId, receiverId], onModel: userType } },
        { upsert: true, new: true }
    );

    // Create a new message
    const newMessage = new Message({
        senderId: senderId,
        receiverId: receiverId,
        onModel: userType,
        message: message
    });

    // Add the message to the conversation and save
    conversation.messages.push(newMessage);
    await conversation.save();

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({
        status: 'success',
        data: {
            message: newMessage,
            conversation: conversation
        }
    });
});


exports.getMessages = catchAsyncError(async (req, res, next) => {
    const receiverId = req.params.id;
    const senderId = req.user.id; 
    // console.log(receiverId, senderId);
    // Find the conversation where both senderId and receiverId are participants
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId]}
    }).populate("messages");

    if (!conversation) {
        return res.status(404).json({
            status: 'error',
            message: 'Conversation not found'
        });
    }

    // Extract conversationId from the found conversation
    const conversationId = conversation._id;

    // Extract messages from the conversation
    const messages = conversation.messages;
    
    res.status(200).json({
        status: 'success',
        data: {
            conversationId: conversationId,
            messages: messages
        }
    });
});