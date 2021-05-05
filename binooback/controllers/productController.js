import { errorHandler } from "../config/dbErrorHandler.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";
import Product from "../models/product.js";

const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    req.product = product;
    next();
  });
};

const read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let product = new Product(fields);

    const { name, description, price, category, quantity } = fields;
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json(result);
    });
  });
};

const remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let product = req.product;
    product = _.extend(product, fields);

    const { name, description, price, category, quantity } = fields;
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "image should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
      product.markModified("photo");
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json(result);
    });
  });
};

const list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortyBy ? req.query.sortBy : "category";

  Product.find(
    req.query.category
      ? { category: parseInt(req.query.category), visibility: "visible" }
      : {
          $or: [
            { category: 1 },
            { category: 2 },
            { category: 3 },
            { category: 4 },
            { category: 5 },
          ],
          visibility: "visible",
        }
  )
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }

      res.send(products);
    });
};

const adminList = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortyBy ? req.query.sortBy : "category";

  Product.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }

      res.send(products);
    });
};

const photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

export { productById, read, create, remove, update, list, adminList, photo };
