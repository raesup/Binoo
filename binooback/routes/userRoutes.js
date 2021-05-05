import express from "express";
import {
  requireSignin,
  isAuth,
  checkPass,
  isAdmin,
} from "../controllers/authController.js";
import {
  userById,
  read,
  update,
  updatePassword,
} from "../controllers/userController.js";

const router = express.Router();
//practice

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.post("/user/pass/:userId", requireSignin, isAuth, checkPass);
router.put("/user/pass/:userId", requireSignin, isAuth, updatePassword);

router.param("userId", userById);

export default router;
