const ServiceRequest = require("../models/serviceRequestModel");

// Get all service requests (for admin)
exports.getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find();
        res.status(200).json({ success: true, data: serviceRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch service requests" });
    }
}

// Get a specific service request by ID
exports.getServiceRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const serviceRequest = await ServiceRequest.findById(id);
        if (!serviceRequest) {
            return res.status(404).json({ success: false, message: "Service request not found" });
        }
        res.status(200).json({ success: true, data: serviceRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch service request" });
    }
}

// Create a new service request
exports.createServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.create(req.body);
        res.status(201).json({ success: true, data: serviceRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create service request" });
    }
}

// Update a service request by ID (e.g., accept, complete, cancel)
exports.updateServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedServiceRequest) {
            return res.status(404).json({ success: false, message: "Service request not found" });
        }
        res.status(200).json({ success: true, data: updatedServiceRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update service request" });
    }
}

// Delete a service request by ID
exports.deleteServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedServiceRequest = await ServiceRequest.findByIdAndDelete(id);
        if (!deletedServiceRequest) {
            return res.status(404).json({ success: false, message: "Service request not found" });
        }
        res.status(200).json({ success: true, message: "Service request deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete service request" });
    }
}
