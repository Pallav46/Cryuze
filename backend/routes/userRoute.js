const express = require('express');
const router = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  deleteUserById,
  resetPassword,
  getUserDetail,
  updateUserPassword,
  updateUserProfile,
  getUserLoginOrNot
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');
const { getAllServiceProviderChatOfCustomer } = require('../controllers/messageController');
const { myOrders } = require('../controllers/confirmationController');
const { createServiceRequest, getUserOrder } = require('../controllers/serviceRequestController');

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/password/forgot').post(forgotPassword)
router.route('/isAuthenticated').get(isAuthenticatedUser, getUserLoginOrNot)
router.route('/auth/resetpassword/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword)
router.route('/me').get(isAuthenticatedUser, getUserDetail)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/chats').get(isAuthenticatedUser, getAllServiceProviderChatOfCustomer)
router.route('/confirm').post(isAuthenticatedUser, createServiceRequest)
router.route('/myOrders').get(isAuthenticatedUser, myOrders)
router.route('/allOrders').get(isAuthenticatedUser, getUserOrder)
router.route('/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUserById)

module.exports = router;