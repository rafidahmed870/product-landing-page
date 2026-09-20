import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cookieParser);
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

export default app;
