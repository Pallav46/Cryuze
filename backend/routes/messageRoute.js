const express = require("express");

const { isAuthenticatedUser, authorizeRoles, isAuthenticatedServiceProvider } = require('../middleware/authentication');
const { sendMessage, getMessages } = require("../controllers/messageController");


const router = express.Router();

router.route("/chatt/:id").get(isAuthenticatedUser, getMessages);
router.route("/send/:receiverId").post(isAuthenticatedUser, sendMessage);
router.route("/providers/send/:receiverId").post(isAuthenticatedServiceProvider, sendMessage);

module.exports = router;