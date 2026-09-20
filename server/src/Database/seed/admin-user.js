import { db, pool } from "../index.js";
import { users, platformRoles } from "../schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

async function seedAdminUser() {
  console.log("Seeding admin user...");

  const [role] = await db
    .select()
    .from(platformRoles)
    .where(eq(platformRoles.name, "admin"))
    .limit(1);

  if (!role) {
    console.log("Admin role not found");
    return;
  }

  const [existingAdminUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, "admin@gmail.com"))
    .limit(1);

  if (existingAdminUser) {
    console.log("Admin user already exists");
    return;
  }

  const password = await bcrypt.hash("admin123", 10);

  await db.insert(users).values({
    name: "admin",
    email: "admin@gmail.com",
    password,
    roleId: role.id,
  });

  console.log("Admin user seeded successfully");
}

seedAdminUser()
  .catch((error) => {
    console.error("Error seeding admin user:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
