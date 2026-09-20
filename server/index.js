import "dotenv/config";
import app from "./src/app.js";

const SERVER_PORT = process.env.SERVER_PORT ?? 5000;

app.listen(SERVER_PORT, "0.0.0.0", () => {
  console.log(`Server is running under port ${SERVER_PORT}`);
});
