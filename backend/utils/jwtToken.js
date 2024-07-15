// Creating token and saving

const sendToken = (user, statusCode, res) => {
  const usertoken = user.getJWTToken();

  // Set cookie with JWT token for session management
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // Set cookie expiration time
    httpOnly: true, // Cookie is not accessible via client-side scripts
    secure: process.env.NODE_ENV === "production" ? true : false, // Cookie sent only over HTTPS in production
  };

  res
    .status(statusCode)
    .cookie("usertoken", usertoken, options) // Set a cookie named "token" with the JWT token
    .json({ success: true, user, usertoken });
};

const sendTokenProvider = (provider, statusCode, res) => {
  const providertoken = provider.getJWTToken();

  // Set cookie with JWT token for session management
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), // Set cookie expiration time
    httpOnly: true, // Cookie is not accessible via client-side scripts
    secure: process.env.NODE_ENV === "production" ? true : false, // Cookie sent only over HTTPS in production
  };

  res
    .status(statusCode)
    .cookie("providertoken", providertoken, options) // Set a cookie named "token" with the JWT token
    .json({ success: true, provider, providertoken });
};

module.exports = { sendToken, sendTokenProvider };
