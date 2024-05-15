const Subcategory = require("../models/subCategoryModel");

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json({ success: true, data: subcategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch subcategories" });
    }
}

// Get a specific subcategory by ID
exports.getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }
        res.status(200).json({ success: true, data: subcategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch subcategory" });
    }
}

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.create(req.body);
        res.status(201).json({ success: true, data: subcategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create subcategory" });
    }
}

// Update a subcategory by ID
exports.updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSubcategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }
        res.status(200).json({ success: true, data: updatedSubcategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update subcategory" });
    }
}

// Delete a subcategory by ID
exports.deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
        if (!deletedSubcategory) {
            return res.status(404).json({ success: false, message: "Subcategory not found" });
        }
        res.status(200).json({ success: true, message: "Subcategory deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete subcategory" });
    }
}
