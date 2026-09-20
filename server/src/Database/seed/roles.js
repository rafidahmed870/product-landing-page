import { db } from "../index.js";
import { platformRoles } from "../schema.js";

async function seedRoles() {
  console.log("Seeding roles...");

  const roles = [{ name: "admin" }, { name: "user" }];

  const existingRoles = await db.select().from(platformRoles);
  if (
    existingRoles.some((role) => role.name === "admin" || role.name === "user")
  ) {
    console.log("Roles already exist");
    return;
  }

  for (const role of roles) {
    await db.insert(platformRoles).values(role);
  }

  console.log("Roles seeded successfully");
  return;
}

seedRoles().catch((error) => {
  console.error("Error seeding roles:", error);
  process.exit(1);
});
