const express = require("express");

const { isAuthenticatedUser, authorizeRoles, isAuthenticatedServiceProvider } = require('../middleware/authentication');
const { sendMessage, getMessages, getProviderMessages, sendProviderMessage } = require("../controllers/messageController");

const router = express.Router();

router.route("/chatt/:id").get(isAuthenticatedUser, getMessages);
router.route("/providers/chatt/:id").get(isAuthenticatedServiceProvider, getProviderMessages);
router.route("/send/:receiverId").post(isAuthenticatedUser, sendMessage);
router.route("/providers/send/:receiverId").post(isAuthenticatedServiceProvider, sendProviderMessage);

module.exports = router;