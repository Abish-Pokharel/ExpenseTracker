import express from "express";
import { getUserDetails, loginUser, registerUser } from "../controllers/auth_controller.js";
import { authenticateUser } from "../middleware/auth_middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateUser, getUserDetails);

export default router;