import { errorHandler } from "../config/dbErrorHandler.js";
import Order from "../models/order.js";

const create = (req, res) => {
  req.body.order.user = req.profile;
  req.body.order.userId = req.profile._id;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

//admin get all orders
const listAllOrders = (req, res) => {
  Order.find()
    .sort({ createdAt: "desc" })
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

const listUserOrders = async (req, res) => {
  const id = req.profile._id;

  Order.find({ userId: id })
    .populate("user", "_id name address")
    .sort({ createAt: "desc" })
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

const updateShippingStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};

export { create, listAllOrders, listUserOrders, updateShippingStatus };
