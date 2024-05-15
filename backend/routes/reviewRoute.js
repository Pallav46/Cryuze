const express = require("express");
const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require("../controllers/reviewController");

const router = express.Router();

router.route("/").get(getAllReviews);
router.route("/:id").get(getReviewById);
router.route("/").post(createReview);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

module.exports = router;
