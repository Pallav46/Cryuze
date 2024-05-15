const Review = require("../models/reviewModel");

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
}

// Get a specific review by ID
exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch review" });
    }
}

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create review" });
    }
}

// Update a review by ID
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update review" });
    }
}

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete review" });
    }
}
