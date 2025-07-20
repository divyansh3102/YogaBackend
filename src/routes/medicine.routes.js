import { Router } from "express";
import {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from "../controllers/medicine.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/add", verifyJWT, isAdmin, upload.single("image"), createMedicine);
router.get("/", verifyJWT, getMedicines);
router.get("/:id", verifyJWT, getMedicineById);
router.put("/:id", verifyJWT, isAdmin, upload.single("image"), updateMedicine);
router.delete("/:id", verifyJWT, isAdmin, deleteMedicine);


export default router;