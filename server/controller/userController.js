const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");
const { getAll, getOne, deleteOne, updateOne } = require("./handlerFactory");
require("express-async-errors");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("image");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`server/public/images/users/${req.file.filename}`);

  next();
};

exports.getAllUsers = getAll(User);
exports.update = updateOne(User);
exports.deleteUser = deleteOne(User);
exports.getUser = getOne(User);

exports.getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMyProfile = async (req, res) => {
  const filteredBody = filterObj(req.body, "fullName", "email", "image");

  if (req.file) filteredBody.photo = req.file.filename;

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

exports.addContent = async (req, res) => {
  const user = await User.findById(req.user.id);

  await user.addContent(req.body.content);

  res.status(200).json({
    status: "success",
    message: "Content successfully added",
  });
};

exports.removeContent = async (req, res) => {
  const user = await User.findById(req.user.id);

  await user.removeContent(req.body.id);

  res.status(204).json({
    status: "success",
    message: "Content successfully deleted",
  });
};

exports.addLikedContent = async (req, res) => {
  const user = await User.findById(req.user.id);

  await user.addFavorite(req.body.content);

  res.status(200).json({
    status: "success",
    message: "Content successfully added",
  });
};

exports.deleteLikedContent = async (req, res) => {
  const user = await User.findById(req.user.id);

  await user.deleteFavorite(req.body.id);

  res.status(204).json({
    status: "success",
    message: "Content successfully deleted",
  });
};

exports.clearLikedContents = async (req, res) => {
  const user = await User.findById(req.user.id);

  await user.clearFavorite();

  res.status(204).json({
    status: "success",
    message: "Contents successfully deleted",
  });
};
