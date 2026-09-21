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

export const orderSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters long"),
  qty: z.coerce.number().min(1, "Quantity must be at least 1"),
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8})$/,
      "Invalid Bangladeshi phone number",
    ),
  address: z.string().min(10, "Address must be at least 10 characters long"),
});
