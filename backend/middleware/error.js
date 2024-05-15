const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof ErrorHandler) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Error of MongoDB Cast
    if (err.name === "CastError") {
        statusCode = 400; // Bad Request
        message = `Resource not found Invalid ${err.path}: ${err.value}`;
        err = new ErrorHandler(message, statusCode);
    }

    // JWT Token Error
    if (err.name === "JsonWebTokenError") {
        statusCode = 401; // Unauthorized
        message = "Invalid token. Please log in again.";
        err = new ErrorHandler(message, statusCode);
    }

    if(err.code == 11000) {
        statusCode = 400; // Bad Request
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, statusCode);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            statusCode,
            message
        }
    });
};
