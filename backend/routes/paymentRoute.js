const express = require("express");
const { checkout, paymentVerification, getKey } = require("../controllers/paymentController");
const router = express.Router();

router.route("/checkout").post(checkout)
router.route("/paymentverification").post(paymentVerification)
router.route("/getKey").get(getKey)

module.exports = router;