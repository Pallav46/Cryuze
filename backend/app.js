const express = require("express");
const app = express();

app.use(express.json())

// Route Imports
const serviceRoutes = require("./routes/serviceRoute");
const userRoutes = require("./routes/userRoute");

app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
