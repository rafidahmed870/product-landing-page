import { TryCatch } from "../Middlewares/tryCatch.js";
import { formatZodError, orderSchema } from "../Utils/zod.js";
import {
  createOrder as createOrderService,
  getPaginatedOrders,
  updateOrderStatusById,
  bulkInsertOrders,
  getAllOrdersForExport,
} from "../Services/orderServices.js";
import { z } from "zod";

// ─── Public: Create Order ────────────────────────────────────────────────────
export const createOrder = TryCatch(async (req, res) => {
  const validation = orderSchema.safeParse(req.body);
  if (!validation.success) {
    const { firstError, allErrors } = formatZodError(validation.error);
    return res.status(400).json({ success: false, message: firstError, errors: allErrors });
  }

  const order = await createOrderService(validation.data);
  if (!order) {
    return res.status(500).json({ success: false, message: "Failed to create order" });
  }
  return res.status(201).json({ success: true, message: "Order created successfully", order });
});

// ─── Admin: Get Paginated Orders ─────────────────────────────────────────────
export const getOrders = TryCatch(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const status = req.query.status || undefined;
  const search = req.query.search || undefined;

  const result = await getPaginatedOrders({ page, limit, status, search });
  return res.status(200).json({ success: true, ...result });
});

// ─── Admin: Update Order Status ───────────────────────────────────────────────
const statusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

export const updateOrderStatus = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "Order ID is required" });
  }

  const validation = statusSchema.safeParse(req.body);
  if (!validation.success) {
    const { firstError } = formatZodError(validation.error);
    return res.status(400).json({ success: false, message: firstError });
  }

  const updated = await updateOrderStatusById(id, validation.data.status);
  if (!updated) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  return res.status(200).json({ success: true, message: "Status updated", order: updated });
});

// ─── Admin: Export Orders as JSON (client converts to CSV) ────────────────────
export const exportOrders = TryCatch(async (req, res) => {
  const status = req.query.status || undefined;
  const data = await getAllOrdersForExport(status);
  return res.status(200).json({ success: true, data });
});

// ─── Admin: Import Orders from CSV rows (JSON array) ─────────────────────────
const importRowSchema = z.object({
  productName: z.string().min(1),
  qty: z.coerce.number().int().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional().default("pending"),
});

export const importOrders = TryCatch(async (req, res) => {
  const rows = req.body;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ success: false, message: "Request body must be a non-empty array of orders" });
  }

  const validRows = [];
  const errors = [];

  rows.forEach((row, index) => {
    const result = importRowSchema.safeParse(row);
    if (result.success) {
      validRows.push(result.data);
    } else {
      errors.push({ row: index + 1, issues: result.error.issues });
    }
  });

  if (validRows.length === 0) {
    return res.status(400).json({ success: false, message: "No valid rows to import", errors });
  }

  const inserted = await bulkInsertOrders(validRows);
  return res.status(201).json({
    success: true,
    message: `${inserted.length} order(s) imported successfully`,
    inserted: inserted.length,
    skipped: errors.length,
    errors: errors.length > 0 ? errors : undefined,
  });
});
