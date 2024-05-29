const User = require("../models/userModel");
const AppError = require("../utils/AppError");
require("express-async-errors");

exports.getAllUsers = async (req, res) => {};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError(`No user found with this id: ${id}`));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
