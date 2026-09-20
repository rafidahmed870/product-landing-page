import { db, pool } from "../index.js";
import { platformRoles } from "../schema.js";

async function seedRoles() {
  console.log("Seeding roles...");

  const roles = [{ name: "admin" }, { name: "user" }];

  const existingRoles = await db.select().from(platformRoles);

  for (const role of roles) {
    const exists = existingRoles.some(
      (existingRole) => existingRole.name === role.name,
    );

    if (!exists) {
      await db.insert(platformRoles).values(role);
      console.log(`Role "${role.name}" created`);
    }
  }

  console.log("Roles seeded successfully");
}

seedRoles()
  .catch((error) => {
    console.error("Error seeding roles:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
