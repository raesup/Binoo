import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { userSignupValidator } from "../validator/index.js";

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
