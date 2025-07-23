
import { Router } from "express";
import { registerUser, loginUser, logoutUser ,getAllUsers,deleteUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();


router.post("/register",upload.single("avatar"), registerUser);
console.log("register route loaded");
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/", verifyJWT,isAdmin, getAllUsers);
router.delete("/:id", verifyJWT, isAdmin, deleteUser);

router.get('/verify-token', isAdmin, (req, res) => {
  res.json({
    success: true,
    user: req.user // user data from the token
  });
}); 

export default router;
