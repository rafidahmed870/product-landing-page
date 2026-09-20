import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runSeed(seedPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [seedPath], {
      stdio: "inherit",
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code, signal) => {
      console.log(`Finished: ${path.basename(seedPath)}`);

      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Seed failed: ${path.basename(seedPath)}, code=${code}, signal=${signal}`,
          ),
        );
      }
    });
  });
}

async function main() {
  const seedFiles = ["roles.js", "admin-user.js"];

  for (const file of seedFiles) {
    console.log(`\nRunning ${file}...`);

    try {
      await runSeed(path.join(__dirname, file));
      console.log(`${file} completed.`);
    } catch (error) {
      console.error(`Error seeding ${file}:`, error);
      process.exitCode = 1;
      return;
    }
  }

  console.log("\nAll seeds completed successfully.");
}

main();
