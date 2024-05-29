const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  // check if there's email && password
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide both password and email", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  //   check the user and password is correct
  if (!user || !user.comparePassword(password)) {
    return next(new AppError("Invalid credentials", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
};
