import express from "express";
import {
  requireSignin,
  isAuth,
  isAdmin,
} from "../controllers/authController.js";
import { userById, read, update } from "../controllers/userController.js";
import { createPaymentIntent } from "../controllers/stripeController.js";
const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);

export default router;
