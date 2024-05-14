const Service = require("../models/serviceModel");

// CREATE SERVICE -- Admin
exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create service" });
    }
}


// GET ALL SERVICE
exports.getAllService = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch services" });
    }
}


// UPDATE SERVICE -- Admin
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update service" });
    }
}
