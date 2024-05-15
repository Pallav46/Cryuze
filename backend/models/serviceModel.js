const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: { type: String, required: [true, 'Name is required.'] },
    description: { type: String, required: [true, 'Description is required.'] },
    category: { type: String, required: [true, 'Category is required.'] },
    priceRange: { type: String, required: [true, 'Price Range is required.'] },
    subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
});

module.exports = mongoose.model("Service", serviceSchema);