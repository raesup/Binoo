import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import User from "../models/user.js";
import Product from "../models/product.js";

const createPaymentIntent = async (req, res) => {
  let amountFromCart = req.body.amount * 100;

  const stripe = new Stripe(process.env.STRIPE_SECRET);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountFromCart,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    amountFromStripe: paymentIntent.amount,
  });
};

export { createPaymentIntent };
