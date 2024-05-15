const express = require("express");
const { getAllService, createService, updateServiceById, getServiceById, deleteServiceById } = require("../controllers/serviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");

const router = express.Router();

router.route("/").get(getAllService);
router.route("/new/admin").post(isAuthenticatedUser, authorizeRoles("admin"), createService); // -- Admin
router.route("/:id").get(getServiceById); 
router.route("/:id/admin").put(isAuthenticatedUser, authorizeRoles("admin"), updateServiceById); // -- Admin
router.route("/:id/admin").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteServiceById); // -- Admin

module.exports = router;