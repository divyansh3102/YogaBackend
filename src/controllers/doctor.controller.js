import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { Doctor } from "../models/doctor.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";




const createDoctor = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.files) 
    const { name, email, status, experienceInYears, educationDetails, servicesOffered, about, phoneNumber } = req.body;
    console.log("Hello doctor controller");
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(avatarLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }

    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { name }],
    });
    if (existingDoctor) {
      throw new ApiError(409, "Doctor with email or name already exists");
    }

    const doctor = await Doctor.create({
      name,
      email,
      status,
      experienceInYears,
      educationDetails,
      servicesOffered,
      about,
      phoneNumber,
      image: image.url,
    });

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().populate("servicesOffered");

  res.status(200).json({
    success: true,
    data: doctors,
  });
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate("servicesOffered");

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const { 
    name, 
    email, 
    status, 
    experienceInYears, 
    educationDetails, 
    servicesOffered, 
    about, 
    phoneNumber 
  } = req.body;

  // 2. Prepare the object for the data to be updated
  const updateData = { 
    name, 
    email, 
    status, 
    experienceInYears, 
    educationDetails, 
    servicesOffered, 
    about, 
    phoneNumber 
  };

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
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id, 
    updateData, // Use the complete updateData object here
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

export {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
}