import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, excerpt, content, tags, readTime } = req.body;

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }

    const blog = await Blog.create({
      title,
      image: image.url,
      excerpt,
      content,
      tags,
    
      readTime,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, tags, date, readTime } = req.body;

  let updateData = { title, excerpt, content, tags, date, readTime };

  if (req.file) {
    const imageLocalPath = req.file.path;
    if (!imageLocalPath) {
      throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
      throw new ApiError(400, "Image is required");
    }
    updateData.image = image.url;
  }

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    data: blogs,
  });
});


export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs
}