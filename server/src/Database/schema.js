import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  numeric,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const platformRoles = pgTable("platform_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  password: text("password").notNull(),
  tokenVersion: numeric("token_version").default(1).notNull(),
  roleId: uuid("role_id")
    .references(() => platformRoles.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  productName: varchar("product_name", { length: 100 }).notNull(),
  qty: integer("qty").notNull(),
  fullName: varchar("full_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  address: text("address").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
