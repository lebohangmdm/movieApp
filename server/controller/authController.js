const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const createSendToken = (res, statusCode, user) => {
  token = signToken(user._id);

  res.cookie("jwt", process.env.JWT_SECRET, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Remove password
  user.password = undefined;

  res.status(statusCode).json({
    success: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  const user = await User.create(req.body);

  createSendToken(res, 201, user);
};

exports.login = async (req, res, next) => {
  // check if there's email && password
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide both password and email", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  //   check the user and password is correct
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = signToken(user._id);

  createSendToken(res, 200, user);
};

exports.updatePassword = async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.comparePassword(req.body.currentPassword))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //   send the token
  createSendToken(res, 200, user);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
