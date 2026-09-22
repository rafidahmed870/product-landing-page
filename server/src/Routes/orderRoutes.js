import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  exportOrders,
  importOrders,
} from "../Controllers/ordersController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { verifyCSRFToken } from "../Config/csrfToken.js";

const router = express.Router();

// ─── Public ───────────────────────────────────────────────────────────────────
router.post("/create-order", createOrder);

// ─── Admin (Protected + CSRF verified) ───────────────────────────────────────
// GET routes: CSRF skipped automatically by verifyCSRFToken
router.get("/admin", authMiddleware, getOrders);
router.get("/admin/export", authMiddleware, exportOrders);

// Non-GET routes: CSRF verified
router.patch("/admin/:id/status", authMiddleware, verifyCSRFToken, updateOrderStatus);
router.post("/admin/import", authMiddleware, verifyCSRFToken, importOrders);

export default router;