const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(cookieParser());

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  const user = await User.create(req.body);

  createSendToken(user, 201, res);
};

exports.login = async (req, res, next) => {
  // check if there's email && password
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide both password and email", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .select("+active");

  if (!user.active) {
    return next(new AppError("Account Deactivated", 403));
  }

  //   check the user and password is correct
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid credentials", 401));
  }

  createSendToken(user, 200, res);
};

exports.updatePassword = async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.comparePassword(req.body.currentPassword))) {
    return next(new AppError("Your password is incorrect", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //   send the token
  createSendToken(user, 200, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
