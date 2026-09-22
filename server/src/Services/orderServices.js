import { db } from "../Database/index.js";
import { orders } from "../Database/schema.js";
import { eq, and, or, ilike, sql, count } from "drizzle-orm";

export const createOrder = async (data) => {
  const result = await db.insert(orders).values(data).returning();
  return result[0];
};

/**
 * Get paginated orders with optional status filter and search query.
 * @param {{ page: number, limit: number, status?: string, search?: string }} options
 */
export const getPaginatedOrders = async ({ page = 1, limit = 10, status, search }) => {
  const offset = (page - 1) * limit;

  const conditions = [];

  if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
    conditions.push(eq(orders.status, status));
  }

  if (search) {
    const searchTerm = `%${search}%`;
    conditions.push(
      or(
        ilike(orders.fullName, searchTerm),
        ilike(orders.email, searchTerm),
        ilike(orders.phone, searchTerm),
        ilike(orders.productName, searchTerm),
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(orders)
      .where(whereClause)
      .orderBy(sql`${orders.createdAt} desc`)
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(orders)
      .where(whereClause),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  const totalPages = Math.ceil(total / limit);

  return { data, total, page, limit, totalPages };
};

/**
 * Update the status of an order by ID.
 */
export const updateOrderStatusById = async (id, status) => {
  const result = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, id))
    .returning();
  return result[0] ?? null;
};

/**
 * Bulk insert orders (for CSV import).
 */
export const bulkInsertOrders = async (rows) => {
  const result = await db.insert(orders).values(rows).returning();
  return result;
};

/**
 * Get all orders for export (no pagination).
 */
export const getAllOrdersForExport = async (status) => {
  const conditions = [];
  if (status && ["pending", "confirmed", "cancelled"].includes(status)) {
    conditions.push(eq(orders.status, status));
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(orders)
    .where(whereClause)
    .orderBy(sql`${orders.createdAt} desc`);
};
