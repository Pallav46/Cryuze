// index.js
const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const http = require("http");
const { initializeSocket } = require("./socket/socket");

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 3030;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
