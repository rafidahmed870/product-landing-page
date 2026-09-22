import express from "express";
import {
  login,
  logout,
  getMe,
  refreshToken,
  refreshCSRF,
} from "../Controllers/authController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { verifyCSRFToken } from "../Config/csrfToken.js";

const router = express.Router();

// Public: login & refresh token
router.post("/login", login);
router.post("/refresh/token", refreshToken);

// Protected: logout, getMe, refresh csrf
router.post("/logout", authMiddleware, verifyCSRFToken, logout);
router.post("/refresh/csrf", authMiddleware, refreshCSRF);
router.get("/me", authMiddleware, getMe);

export default router;

