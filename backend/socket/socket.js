const { Server } = require("socket.io");

// Initialize socket and userSocketMap
let io;
const userSocketMap = {}; // {userId: socketId}

// Initialize socket
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    // console.log(`User ID: ${userId}`);

    if (userId && userId !== "undefined") {
      userSocketMap[userId] = socket.id;
      // console.log(`User ${userId} is connected with socket ID: ${socket.id}`);
      socket.join(userId); // Join room based on userId

      // Emit event to send online users to all clients
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // Listen for disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (userId && userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        // console.log(`User ${userId} has been removed from userSocketMap`);
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

// Function to get receiver's socket ID
const getReceiverSocketId = (receiverId) => {
  // console.log(`Getting socket ID for receiver: ${receiverId}`);
  // console.log(userSocketMap[receiverId]);
  return userSocketMap[receiverId];
};

// Function to send message to a specific user
const sendMessageToUser = (userId, event, data) => {
  const socketId = getReceiverSocketId(userId);
  if (socketId) {
    io.to(userId).emit(event, data);
    // console.log(`${event} sent to user ${userId}`);
  } else {
    // console.log(`User ${userId} not found or offline`);
  }
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  sendMessageToUser,
  io
};
