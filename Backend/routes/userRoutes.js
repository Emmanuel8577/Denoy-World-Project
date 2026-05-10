import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
// 1. Change 'protect' to 'authUser'
import { authUser } from "../middleware/auth.js"; 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 2. Update the middleware name here
router.get("/profile", authUser, getUserProfile); 

export default router;