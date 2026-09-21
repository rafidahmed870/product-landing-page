import { TryCatch } from "../Middlewares/tryCatch.js";
import { formatZodError, orderSchema } from "../Utils/zod.js";

export const createOrder = TryCatch(async (req, res) => {
  const validation = orderSchema.safeParse(req.body);
  if (!validation.success) {
    const { firstError, allErrors } = formatZodError(validation.error);
    return res
      .status(400)
      .json({ success: false, message: firstError, errors: allErrors });
  }

  const order = await createOrder(validation.data);
  if (!order) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create order" });
  }
  return res
    .status(201)
    .json({ success: true, message: "Order created successfully" });
});
