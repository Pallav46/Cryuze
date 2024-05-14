const express = require("express");
const { getAllService, createService, updateService } = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(getAllService);
router.route("/new").post(createService);
router.route("/:id").put(updateService);

module.exports = router;