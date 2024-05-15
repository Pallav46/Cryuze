const ServiceProvider = require("../models/serviceProviderModel");

// CREATE SERVICE PROVIDER
exports.createServiceProvider = async (req, res, next) => {
    try {
        const serviceProvider = await ServiceProvider.create(req.body);
        res.status(201).json({ success: true, data: serviceProvider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create service provider" });
    }
}

// GET ALL SERVICE PROVIDERS
exports.getAllServiceProvider = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json({ success: true, data: serviceProviders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch service providers" });
    }
}

// GET SERVICE PROVIDER BY ID
exports.getServiceProviderById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceProvider = await ServiceProvider.findById(id);
        if (!serviceProvider) {
            return res.status(404).json({ success: false, message: "Service provider not found" });
        }
        res.status(200).json({ success: true, data: serviceProvider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch service provider" });
    }
}

// UPDATE SERVICE PROVIDER BY ID
exports.updateServiceProviderById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedServiceProvider) {
            return res.status(404).json({ success: false, message: "Service provider not found" });
        }
        res.status(200).json({ success: true, data: updatedServiceProvider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update service provider" });
    }
}

// DELETE SERVICE PROVIDER BY ID
exports.deleteServiceProviderById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedServiceProvider = await ServiceProvider.findByIdAndDelete(id);
        if (!deletedServiceProvider) {
            return res.status(404).json({ success: false, message: "Service provider not found" });
        }
        res.status(200).json({ success: true, message: "Service provider deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete service provider" });
    }
}
