const express = require("express");
const {
  createServiceProvider,
  deleteServiceProviderById,
  loginServiceProvider,
  logoutServiceProvider,
  forgotPasswordServiceProvider,
  resetPasswordServiceProvider,
  updateServiceProviderPassword,
  getServiceProviderDetail,
  updateServiceProviderProfile,
  updateServiceProviderService,
  getServiceProviderService,
  getServiceProviderById
} = require("../controllers/serviceProviderController");

const { isAuthenticatedServiceProvider, isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");
const { getAllCustomersOfServiceProvider } = require("../controllers/messageController");

const router = express.Router();

// router.route("/").get(getAllServiceProvider);
router.route("/register").post(createServiceProvider);
router.route("/login").post(loginServiceProvider);
router.route('/logout').get(logoutServiceProvider);
router.route('/password/forgot').post(forgotPasswordServiceProvider)
router.route('/auth/resetpassword/:token').put(resetPasswordServiceProvider)
router.route('/password/update').put(isAuthenticatedServiceProvider, updateServiceProviderPassword)
router.route('/me').get(isAuthenticatedServiceProvider, getServiceProviderDetail)
router.route('/me/update').put(isAuthenticatedServiceProvider, updateServiceProviderProfile)
router.route('/me/updateService').put(isAuthenticatedServiceProvider, updateServiceProviderService)
router.route('/me/services').get(isAuthenticatedServiceProvider, getServiceProviderService)
router.route('/chatts').get(isAuthenticatedServiceProvider, getAllCustomersOfServiceProvider)
router.route("/:id").get(getServiceProviderById);
// router.route("/:id").put(updateServiceProviderById);
// router.route("/:id").delete(deleteServiceProviderById); // -- Admin

module.exports = router;
