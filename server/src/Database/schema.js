import {pgTable,uuid, varchar, timestamp, text, numeric} from "drizzle-orm/pg-core";

export const platformRoles = pgTable("platform_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', {length: 50}).notNull().unique(),
    password: text('password').notNull(),
    tokenVersion: numeric('token_version').default(1).notNull(),
    roleId: uuid('role_id').references(() => platformRoles.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});