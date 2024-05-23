const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const catchAsyncError = require("../middleware/catchAsyncError");
// const { getReceiverSocketId, io } = require("../socket/socket");

exports.sendMessage = catchAsyncError(async (req, res, next) => {
  const { receiverId, message } = req.body;
  if(req.user.id) {
    senderId = req.user.id
    userType = "User"
  } else {
    senderId = req.serviceProvider.id;
    userType = "ServiceProvider"
  }

  // Find or create the conversation between sender and receiver
  let conversation = await Conversation.findOneAndUpdate(
    { participants: { $all: [senderId, receiverId] } },
    {
      $setOnInsert: { participants: [senderId, receiverId], onModel: userType },
    },
    { upsert: true, new: true }
  );

  // Create a new message
  const newMessage = new Message({
    senderId,
    receiverId,
    onModel: userType,
    message,
  });

  // Add the message to the conversation and save
  conversation.messages.push(newMessage);
  await conversation.save();

  // Save the message to the database
  await newMessage.save();

  // Emit the new message to the receiver using Socket.IO
//   const receiverSocketId = getReceiverSocketId(receiverId);
//   if (receiverSocketId) {
//     io.to(receiverSocketId).emit("newMessage", newMessage);
//   }

  res.status(201).json({ status: "success", data: { message: newMessage, conversation } });
});

exports.getMessages = catchAsyncError(async (req, res, next) => {
  const receiverId = req.params.id;
  const senderId = req.user.id;
  // console.log(receiverId, senderId);
  // Find the conversation where both senderId and receiverId are participants
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(404).json({
      status: "error",
      message: "Conversation not found",
    });
  }

  // Extract conversationId from the found conversation
  const conversationId = conversation._id;

  // Extract messages from the conversation
  const messages = conversation.messages;

  res.status(200).json({
    status: "success",
    data: {
      conversationId: conversationId,
      messages: messages,
    },
  });
});

exports.getAllCustomersOfServiceProvider = catchAsyncError(
  async (req, res, next) => {
    const providerId = req.serviceProvider.id;

    // Find all conversations involving the service provider
    const conversations = await Conversation.find({
      participants: providerId,
      onModel: "ServiceProvider",
    });

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
      "name"
    );

    res.status(200).json({
      status: "success",
      data: {
        customers: customers.map((customer) => customer.name),
      },
    });
  }
);
