const Service = require("../models/serviceModel");

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
