const express = require("express");
const { getAllService, createService, updateServiceById, getServiceById, deleteServiceById, addSubCategoryToService } = require("../controllers/serviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");

const router = express.Router();

router.route("/").get(getAllService);
router.route("/admin/service/new").post(createService); // -- Admin
router.route("/service/:id").get(getServiceById); 
router.route("/admin/service/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateServiceById); // -- Admin
router.route("/admin/service/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteServiceById); // -- Admin
router.route("/admin/service/:id/addSubcategory").post(addSubCategoryToService); // -- Admin

module.exports = router;