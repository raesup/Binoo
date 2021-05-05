import express from "express";
import {
  create,
  productById,
  read,
  remove,
  update,
  list,
  adminList,
  photo,
} from "../controllers/productController.js";

import {
  requireSignin,
  isAuth,
  isAdmin,
} from "../controllers/authController.js";
import { userById } from "../controllers/userController.js";

const router = express.Router();

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get(
  "/products/admin/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  adminList
);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

export default router;
