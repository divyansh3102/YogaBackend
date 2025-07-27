// src/controllers/medicine.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Medicine } from "../models/medicine.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createMedicine = asyncHandler(async (req, res) => {
  try {
    const { name, category, stocks, price } = req.body;

    const existingMedicine = await Medicine.findOne({ name });
    if (existingMedicine) {
      throw new ApiError(409, "Medicine with this name already exists");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }

    const medicine = await Medicine.create({
      name,
      category,
      stocks,
      price,
      image:image.url,
    });

    res.status(201).json({
      success: true,
      data: medicine,
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const getMedicines = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find();

  res.status(200).json({
    success: true,
    data: medicines,
  });
});

const getMedicineById = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  res.status(200).json({
    success: true,
    data: medicine,
  });
});

const updateMedicine = asyncHandler(async (req, res) => {
 const { name, category, stocks, price } = req.body;
   const updateData = { name, category, stocks, price };

   if(req.file){
     const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }
    updateData.image = image.url;

   }

   const medicine = await Medicine.findByIdAndUpdate(
    req.params.id, 
    updateData, // Use the complete updateData object here
    {
      new: true,
      runValidators: true,
    }
  );

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  res.status(200).json({
    success: true,
    data: medicine,
  });
});

const deleteMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndDelete(req.params.id);

  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
}