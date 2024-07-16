const Content = require("../models/contentModel");
const multer = require("multer");
const path = require("path");

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require("./handlerFactory");
const AppError = require("../utils/AppError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/public/images/contents"); // Folder to save uploaded files
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".")[0];
    const ext = file.mimetype.split("/")[1];
    cb(null, `${name}-${Date.now()}.${ext}`); // Add timestamp to file name
  },
});

// Define file filter
const fileFilter = (req, file, cb) => {
  // Allowed MIME types for images
  console.log(file);
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new AppError(
        "Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.",
        400
      ),
      false
    ); // Reject the file
  }
};

// Create multer instance with file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5 MB
});

exports.uploadSingleImage = upload.single("coverImage");
exports.createContent = createOne(Content);
exports.getAllContents = getAll(Content);
exports.getContent = getOne(Content, "reviews");
exports.updateContent = updateOne(Content);
exports.deleteContent = deleteOne(Content);

exports.getRandomContents = async (req, res) => {
  const contents = await Content.aggregate([{ $sample: { size: 10 } }]);

  res.status(200).json({
    status: "success",
    count: contents.length,
    data: {
      contents,
    },
  });
};
