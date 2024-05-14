const express = require("express");
const { createUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);

module.exports = router;