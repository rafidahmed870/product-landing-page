import { db } from "../Database/index.js";
import { users } from "../Database/schema.js";
import { eq } from "drizzle-orm";

export const getUserById = async (id) => {
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (user.length === 0) {
    return null;
  }
  return user[0];
};

export const getUserByEmail = async (email) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) {
    return null;
  }
  return user[0];
};
