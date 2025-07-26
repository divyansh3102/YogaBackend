
import { Router } from "express";
import { loginUser, logoutUser ,getAllUsers,} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();


router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/", verifyJWT,isAdmin, getAllUsers);


export default router;
