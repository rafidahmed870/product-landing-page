import express from "express";
import { createOrder } from "../Controllers/ordersController.js";

const router = express.Router();

router.post("/create-order", createOrder);

export default router;