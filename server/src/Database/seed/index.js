import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runSeeds(seedPath) {
  return new Promise((resolve, reject) => {
    const process = spawn("node", [seedPath], {
      stdio: "inherit",
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Seed failed with code ${code}`));
      }
    });
  });
}

(async () => {
  // Multiple when needed
  const seedFiles = ["roles.js"];

  for (const file of seedFiles) {
    try {
      await runSeeds(path.join(__dirname, file));
    } catch (error) {
      console.error(`Error seeding ${file}:`, error);
      process.exit(1);
    }
  }
})();
