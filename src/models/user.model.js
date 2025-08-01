import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const validDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "protonmail.com",
];

const isDomainValid = (email) => {
  const domain = email.split("@")[1].toLowerCase();
  return validDomains.includes(domain);
};
const validateEmail = (email) => {
  const domain = email.split("@")[1].toLowerCase();
  return validDomains.includes(domain);
};
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
   
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function (next) {
    //Agar password field modified huwa hai toh usko change karna, nahi toh return kar jao
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    if (typeof password !== "string" || typeof this.password !== "string") {
        return false;
    }
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
  
  return jwt.sign({
    _id : this._id,
    email : this.email,
    username : this.username,
    fullName : this.fullName
     
  },
  process.env.ACCESS_TOKEN_SECRET,
  
{
  expiresIn :process.env.ACCESS_TOKEN_EXPIRY
})
}
userSchema.methods.generateRefreshToken = function(){

  return jwt.sign({
    _id : this._id,
    email : this.email,
    username : this.username,
    fullName : this.fullName
     
  },
process.env.REFRESH_TOKEN_SECRET,
{
  expiresIn :process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = mongoose.model("User", userSchema);


