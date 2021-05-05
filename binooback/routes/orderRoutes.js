import express from "express";
import {
  create,
  listAllOrders,
  listUserOrders,
  updateShippingStatus,
} from "../controllers/orderController.js";

import {
  requireSignin,
  isAuth,
  isAdmin,
} from "../controllers/authController.js";
import { userById } from "../controllers/userController.js";

const router = express.Router();

//admin get all orders
router.get(
  "/order/list/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  listAllOrders
);

//user get orders
router.get("/orders/by/user/:userId", requireSignin, isAuth, listUserOrders);

//update shiping status
router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateShippingStatus
);

//create order
router.post("/order/create/:userId", requireSignin, isAuth, create);

router.param("userId", userById);
// router.param("productId", productById);

export default router;
