import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/Database/schema.js",
  out: "./src/Database/migrations",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
