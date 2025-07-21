import { Router } from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/service.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/add", verifyJWT, isAdmin, upload.single("image"), createService);
router.get("/",  getServices);
router.get("/:id", verifyJWT, getServiceById);
router.put("/:id", verifyJWT, isAdmin, upload.single("image"), updateService);
router.delete("/:id", verifyJWT, isAdmin, deleteService);


export default router;