
import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      required: true,
    },
    educationDetails: {
      type: String,
      required: true,
    },
    servicesOffered: [{
      type: String,
      required: true,
    }],
    image: {
      type: String, // URL to the image
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);

