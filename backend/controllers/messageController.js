const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ServiceProvider = require("../models/serviceProviderModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const {
  sendMessageToUser,
} = require("../socket/socket");
const mongoose = require("mongoose");

// const io = initializeSocket()

exports.sendMessage = catchAsyncError(async (req, res, next) => {
  // Extract data from the request body and parameters
  const { message } = req.body;
  const receiverId = req.params.receiverId;
  const senderId = req.user.id;

  // Check if sender and receiver exist
  const sender = await getUserOrServiceProvider(senderId);
  const receiver = await getUserOrServiceProvider(receiverId);

  if (!sender || !receiver) {
    res.status(404).json({
      success: true,
      message: "Sender or receiver not found",
      });
    return next(new ErrorHandler(404, "Sender or receiver not found"));
  }

  // Create a new message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    senderModel: sender.constructor.modelName,
    receiverModel: receiver.constructor.modelName,
    message,
  });

  // Find or create conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      onModel: "User",
    });
  }

  // Add the message to the conversation
  conversation.messages.push(newMessage);
  await conversation.save();

  // Emit a socket event to the receiver and sender for real-time update
  sendMessageToUser(receiverId, "newMessage", newMessage);
  sendMessageToUser(senderId, "newMessage", newMessage);

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

exports.sendProviderMessage = catchAsyncError(async (req, res, next) => {
  // Extract data from the request body and parameters
  const { message } = req.body;
  const receiverId = req.params.receiverId;
  const senderId = req.serviceProvider.id;

  // Check if sender and receiver exist
  const sender = await getUserOrServiceProvider(senderId);
  const receiver = await getUserOrServiceProvider(receiverId);

  if (!sender || !receiver) {
    return next(new ErrorHandler(404, "Sender or receiver not found"));
  }

  // Create a new message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    senderModel: sender.constructor.modelName,
    receiverModel: receiver.constructor.modelName,
    message,
  });

  // Find or create conversation
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      onModel: "User",
    });
  }

  // Add the message to the conversation
  conversation.messages.push(newMessage);
  await conversation.save();

  // Emit a socket event to the receiver and sender for real-time update
  sendMessageToUser(receiverId, "newMessage", newMessage);
  sendMessageToUser(senderId, "newMessage", newMessage);

  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

// Function to get user or service provider based on the ID
async function getUserOrServiceProvider(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const user = await User.findById(id);
  if (user) {
    return user;
  }
  const serviceProvider = await ServiceProvider.findById(id);
  return serviceProvider;
}

exports.getMessages = catchAsyncError(async (req, res, next) => {
  const receiverId = req.params.id;
  const senderId = req.user.id;
  // console.log(receiverId, senderId);
  // Find the conversation where both senderId and receiverId are participants
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  // Extract conversationId from the found conversation
  const conversationId = conversation._id;

  // Extract messages from the conversation
  const messages = conversation.messages;

  res.status(200).json(messages);
});

exports.getProviderMessages = catchAsyncError(async (req, res, next) => {
  const receiverId = req.params.id;
  const senderId = req.serviceProvider.id;
  // console.log(receiverId, senderId);
  // Find the conversation where both senderId and receiverId are participants
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  // Extract conversationId from the found conversation
  const conversationId = conversation._id;

  // Extract messages from the conversation
  const messages = conversation.messages;

  res.status(200).json(messages);
});

exports.getAllCustomersChatOfServiceProvider = catchAsyncError(
  async (req, res, next) => {
    const providerId = req.serviceProvider.id;

    // Find all conversations involving the service provider
    const conversations = await Conversation.find({
      participants: providerId,
      onModel: "User",
    });
    // console.log(conversations);
    // Extract participant IDs from conversations
    const participantIds = conversations.reduce((ids, convo) => {
      return ids.concat(
        convo.participants.filter(
          (id) => id.toString() !== providerId.toString()
        )
      );
    }, []);

    // Query the User model to retrieve names of participants
    const customers = await User.find({ _id: { $in: participantIds } }).select(
      "-password"
    );

    res.status(200).json(customers);
  }
);

exports.getAllServiceProviderChatOfCustomer = catchAsyncError(
  async (req, res, next) => {
    try {
      const customerId = req.user.id;

      // Find all conversations involving the customer where the customer is a participant
      const conversations = await Conversation.find({
        participants: customerId,
        onModel: "User",
      });

      // Extract participant IDs from conversations
      const participantIds = conversations.reduce((ids, convo) => {
        return ids.concat(
          convo.participants.filter(
            (id) => id.toString() !== customerId.toString()
          )
        );
      }, []);
      // Query the ServiceProvider model to retrieve details of service providers
      const serviceProvider = await ServiceProvider.find({
        _id: { $in: participantIds },
      }).select("-password");

      res.status(200).json(serviceProvider);
    } catch (error) {
      console.error("Error fetching service providers for customer:", error);
      res.status(500).json({
        status: "error",
        message: "An error occurred while fetching service providers.",
      });
    }
  }
);
