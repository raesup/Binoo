import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: Number,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    visibility: {
      type: String,
      default: "visible",
      enum: ["visible", "invisible"],
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
