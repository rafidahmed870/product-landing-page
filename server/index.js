import "dotenv/config";
import app from "./src/app.js";
import redisClient from "./src/Utils/redisClient.js";

const SERVER_PORT = process.env.SERVER_PORT ?? 5000;

app.listen(SERVER_PORT, "0.0.0.0", async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.log("Error connecting to Redis", error);
    process.exit(1);
  }
  console.log(`Server is running under port ${SERVER_PORT}`);
});
