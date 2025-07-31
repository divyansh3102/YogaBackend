import {Router} from "express";
import { createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getAllBlogs} from "../controllers/blog.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/add", verifyJWT, isAdmin, upload.single("image"), createBlog);
router.get("/",  getAllBlogs);
router.get("/:id", verifyJWT, getBlogById);
router.put("/:id", verifyJWT, isAdmin, upload.single("image"), updateBlog);
router.delete("/:id", verifyJWT, isAdmin, deleteBlog);

export default router;