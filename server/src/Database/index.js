import "dotenv/config";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const DB_URL = process.env.DB_URL ?? null;

if (!DB_URL) {
    throw new Error("DB_URL is not defined in .env file!");
}

const { Pool } = pg;
const pool = new Pool({
    connectionString: DB_URL
});
const db = drizzle(pool);

export { db, pool };