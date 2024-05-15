const express = require("express");
const { getAllServiceProvider, createServiceProvider, getServiceProviderById, updateServiceProviderById, deleteServiceProviderById } = require("../controllers/serviceProviderController");


const router = express.Router();

router.route("/").get(getAllServiceProvider);
router.route("/register").post(createServiceProvider); 
router.route("/:id").get(getServiceProviderById); 
router.route("/:id").put(updateServiceProviderById); 
router.route("/:id").delete(deleteServiceProviderById); // -- Admin


module.exports = router;
