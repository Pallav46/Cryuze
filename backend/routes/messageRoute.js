const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');
const { sendMessage, getMessages } = require("../controllers/messageController");


const router = express.Router();

router.route("/send-message").post(isAuthenticatedUser, sendMessage);
router.route("/chatt/:id").get(isAuthenticatedUser, getMessages);

module.exports = router;
