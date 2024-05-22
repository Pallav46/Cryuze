const Service = require("../models/serviceModel");
const Subcategory = require("../models/subCategoryModel")
const ServiceProvider = require("../models/serviceProviderModel")
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// CREATE SERVICE -- Admin
exports.createService = catchAsyncError(async (req, res, next) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

// GET ALL SERVICE
exports.getAllService = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFeatures(Service.find(), req.query)
    .search()
    .filter();
  const services = await apifeatures.query;
  res.status(200).json({ success: true, data: services });
});

// GET SERVICE BY ID
exports.getServiceById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const service = await Service.findById(id).populate("subCategories");
  if (!service) {
    return next(new ErrorHandler("Service not found", 404));
  }
  res.status(200).json({ success: true, data: service });
});

// UPDATE SERVICE -- Admin
exports.updateServiceById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const updatedService = await Service.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedService) {
    return next(new ErrorHandler("Service not found", 404));
  }
  res.status(200).json({ success: true, data: updatedService });
});

// DELETE SERVICE -- Admin
exports.deleteServiceById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deletedService = await Service.findByIdAndDelete(id);
  if (!deletedService) {
    return next(new ErrorHandler("Service not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Service deleted successfully" });
});

// Add Subcategory to Service -- Admin
exports.addSubCategoryToService = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subCategoryIds } = req.body;

    // Find the service by ID
    const service = await Service.findById(id);
    if (!service) {
      return next(new ErrorHandler("Service not found", 404));
    }

    // Find the subcategories by their IDs
    const subcategories = await Subcategory.find({
      _id: { $in: subCategoryIds },
    });

    // Add only the unique subcategories to the service's subcategories array
    subcategories.forEach((subcategory) => {
      if (!service.subCategories.includes(subcategory._id)) {
        service.subCategories.push(subcategory._id);
      }
    });

    // Save the updated service
    await service.save();

    res.status(200).json({
      success: true,
      message: "Subcategories added to the service successfully",
    });
  } catch (err) {
    return next(err);
  }
});

exports.findNearbyServiceProviders = async (req, res) => {
  const { lng, lat, distance } = req.query;
  const {id} = req.params;

  if (!lng || !lat) {
    return res.status(400).json({ error: "Coordinates are required" });
  }

  const coordinates = [parseFloat(lng), parseFloat(lat)];
  const maxDistance = distance ? parseInt(distance) : 100000000; // default to 100km if not provided

  try {
    const nearbyProviders = await ServiceProvider.findNearby(coordinates, maxDistance);
    // Modify the response to include only the desired fields
    const nearbyServiceProviders = nearbyProviders.filter(provider => {
      return provider.services.some(service => service.equals(id));
    });

    const simplifiedProviders = nearbyServiceProviders.map((provider) => ({
      _id: provider._id,
      name: provider.name,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      distance: provider.distance
    }));
    
    res.status(200).json(simplifiedProviders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


