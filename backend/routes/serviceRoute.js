const express = require("express");
const { getAllService, createService, updateServiceById, getServiceById, deleteServiceById, addSubCategoryToService, findNearbyServiceProviders } = require("../controllers/serviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");
const { sendNotification } = require("../controllers/notificationController");

const router = express.Router();

router.route("/").get(getAllService);
router.route("/admin/service/new").post(createService); // -- Admin
router.route("/service/:id/buy/:subcatId").get(findNearbyServiceProviders); 
router.route("/service/:id/buy/:subcatId/send-notif").post(isAuthenticatedUser, sendNotification); 
router.route("/service/:id").get(getServiceById); 
router.route("/service/:id").put(updateServiceById); // -- Admin
router.route("/service/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteServiceById); // -- Admin
router.route("/admin/service/:id/addSubcategory").post(addSubCategoryToService); // -- Admin

module.exports = router;