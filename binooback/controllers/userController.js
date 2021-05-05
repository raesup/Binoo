import User from "../models/user.js";

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

const update = (req, res) => {
  const { name, address } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!name || !address) {
      return res.status(400).json({
        error: "Name and address is required",
      });
    }

    if (name && address) {
      user.name = name;
      user.address = address;
    }

    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      res.json(updatedUser);
    });
  });
};

const updatePassword = (req, res) => {
  const { password } = req.body;

  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: "Password is required.",
      });
    }

    if (password) {
      user.password = password;
    }

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
  });
};

export { userById, read, update, updatePassword };
