const express = require("express");
const { getAllSubcategories, getSubcategoryById, createSubcategory, updateSubcategory, deleteSubcategory } = require("../controllers/subCategoryController");

const router = express.Router();

router.route("/").get(getAllSubcategories);
router.route("/:id").get(getSubcategoryById);
router.route("/").post(createSubcategory); // Accessible by admin
router.route("/:id").put(updateSubcategory); // Accessible by admin
router.route("/:id").delete(deleteSubcategory); // Accessible by admin

module.exports = router;
