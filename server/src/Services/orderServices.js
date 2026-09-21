import { db } from "../Database/index.js";
import { orders } from "../Database/schema.js";

export const createOrder = async (data) => {
  const result = await db.insert(orders).values(data).returning();
  return result[0];
};
