import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import orderRoutes from "./Routes/orderRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

export default app;
