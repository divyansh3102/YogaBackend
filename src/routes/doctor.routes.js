import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";


const router = Router();

router.post("/add", verifyJWT,isAdmin, upload.single("image"), createDoctor);
router.get("/",  getDoctors);
router.get("/:id", verifyJWT,isAdmin, getDoctorById);
router.put("/:id", verifyJWT,isAdmin, upload.single("image"), updateDoctor);
router.delete("/:id", verifyJWT,isAdmin, deleteDoctor);

export default router;