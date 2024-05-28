const User = require("../models/userModel");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

router.post("/register", async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

router.post("/login", async (req, res, next) => {
  // check if there's email && password
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide both password and email");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.comparePassword(password)) {
    throw new Error("Invalid credentials");
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

module.exports = router;
