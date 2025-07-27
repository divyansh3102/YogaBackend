// src/controllers/service.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Service } from "../models/services.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";  


const createService = asyncHandler(async (req, res) => {
  try {
    const { eventName, instructor, date, time, mode } = req.body;

    const existingService = await Service.findOne({ eventName });
    if (existingService) {
      throw new ApiError(409, "Service with this event name already exists");
    }
 const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(avatarLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }
    const service = await Service.create({
      eventName,
      instructor,
      date,
      time,
      mode,
      description: req.body.description,
      image: image.url, 
    });

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    data: services,
  });
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

const updateService = asyncHandler(async (req, res) => {
   const { eventName, instructor, date, time, mode } = req.body;
   const updateData = { eventName, instructor, date, time, mode };
  if (req.file) {
    const avatarLocalPath = req.file.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(avatarLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }
    updateData.image = image.url;
  }

  const service = await Service.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    data: service,
  })
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
}