import express from "express";
import { createPayment, executePayment } from "../controller/payment.controller.js";

const router = express.Router();

// Create payment route
router.post("/create-payment", createPayment);

// Execute payment route
router.post("/execute-payment", executePayment);

export default router;