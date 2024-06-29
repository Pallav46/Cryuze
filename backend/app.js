const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve static files from the correct "frontend/dist" directory
const staticPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(staticPath));

// Middleware Imports
const errorMiddleware = require("./middleware/error");

// Route Imports
const serviceRoutes = require("./routes/serviceRoute");
const userRoutes = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const serviceProviderRoutes = require("./routes/serviceProviderRoute");
const subCategoryRoutes = require("./routes/subCategoryRoute");
const paymentRoute = require("./routes/paymentRoute");
// const serviceRequestRoutes = require("./routes/serviceRequestRoute");
// const reviewRoutes = require("./routes/reviewRoute");

// Mount routes
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", messageRoute);
app.use("/api/v1/providers", serviceProviderRoutes);
app.use("/api/v1/subcategories", subCategoryRoutes);
app.use("/api/v1/pay", paymentRoute);
// app.use("/api/v1/service-requests", serviceRequestRoutes);
// app.use("/api/v1/reviews", reviewRoutes);

// Wildcard route to serve index.html
app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../frontend/dist", "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send(err);
        }
    });
});

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
