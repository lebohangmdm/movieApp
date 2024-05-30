const User = require("../models/userModel");
const AppError = require("../utils/AppError");
require("express-async-errors");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = async (req, res, next) => {};

exports.getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;
  console.log("get my profile");
  next();
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
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

exports.updateMyProfile = async (req, res) => {
  const filteredBody = filterObj(req.body, "fullName", "email", "image");
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
};

exports.deleteMyProfile = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
};
