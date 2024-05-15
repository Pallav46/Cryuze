// Creating token and saving

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // Set cookie with JWT token for session management
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // Set cookie expiration time
        httpOnly: true, // Cookie is not accessible via client-side scripts
        secure: process.env.NODE_ENV === "production" ? true : false, // Cookie sent only over HTTPS in production
    };

    res.status(statusCode)
        .cookie("token", token, options) // Set a cookie named "token" with the JWT token
        .json({ success: true, user, token });
};

module.exports = sendToken