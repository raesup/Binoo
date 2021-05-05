import User from "../models/user.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import { errorHandler } from "../config/dbErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();

const signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

const login = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email doesn't exist. Please sign up first",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email, role, address } = user;
    return res.json({ token, user: { _id, email, name, role, address } });
  });
};

const logout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Sign out success" });
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin page, access denied",
    });
  }
  next();
};

const checkPass = (req, res) => {
  const { password } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        password: "password does not match",
      });
    }

    return res.json({
      password: "true",
    });
  });
};

export { signup, login, logout, isAuth, isAdmin, checkPass, requireSignin };
