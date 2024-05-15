const express = require("express");
const { getAllServiceRequests, getServiceRequestById, createServiceRequest, updateServiceRequest, deleteServiceRequest } = require("../controllers/serviceRequestController");

const router = express.Router();

router.route("/").get(getAllServiceRequests); // Accessible by admin
router.route("/:id").get(getServiceRequestById);
router.route("/").post(createServiceRequest);
router.route("/:id").put(updateServiceRequest);
router.route("/:id").delete(deleteServiceRequest);

module.exports = router;
