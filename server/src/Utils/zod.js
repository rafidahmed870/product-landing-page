import { z } from "zod";

export const formatZodError = (zodError) => {
  let firstError = "Validation Error";
  let allErrors = [];
  if (zodError?.issues && Array.isArray(zodError.issues)) {
    allErrors = zodError.issues.map((issue) => ({
      field: issue.path ? issue.path.join(".") : "unknown",
      message: issue.message || "Validation error",
      code: issue.code,
    }));
    firstError = allErrors[0]?.message || "Validation Error";
  }
  return { firstError, allErrors };
};

// ─── Auth Schemas ─────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

// ─── Order Schemas ────────────────────────────────────────────────────────────
export const orderSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters long"),
  qty: z.coerce.number().min(1, "Quantity must be at least 1"),
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal(""))
    .transform((val) => val || "no-email@customer.com"),
  phone: z
    .string()
    .regex(
      /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8})$/,
      "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)",
    ),
  address: z.string().min(6, "কমপক্ষে ৬ অক্ষরের সম্পূর্ণ ঠিকানা দিন"),
});

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"], {
    errorMap: () => ({ message: "Status must be 'pending', 'confirmed', or 'cancelled'" }),
  }),
});

export const importRowSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  qty: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal(""))
    .transform((v) => v || "no-email@customer.com"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional().default("pending"),
});
