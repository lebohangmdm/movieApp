const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const storage = require("../config/firebaseStorage");
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

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${uuidv4()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    // .toFile(`public${req.body.filename}`);
    .toFile(
      `https://firebasestorage.googleapis.com/v0/b/${storage.name}/0/${req.file.filename}?alt=media`
    );

  next();
};

exports.getAllUsers = getAll(User);
exports.update = updateOne(User);
exports.deleteUser = deleteOne(User);

exports.getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;
  console.log("get my profile");
  next();
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById({ _id: id }, { active: true });

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
