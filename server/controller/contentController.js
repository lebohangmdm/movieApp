const Content = require("../models/contentModel");
const APIFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");

exports.createContent = async (req, res, next) => {
  const content = await Content.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      content,
    },
  });
};

exports.getAllContents = async (req, res, next) => {
  const features = new APIFeatures(Content.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const contents = await features.query;

  res.status(200).json({
    status: "success",
    count: contents.length,
    data: {
      contents,
    },
  });
};

exports.getContent = async (req, res, next) => {
  const { id } = req.params;

  const content = await Content.findById(id).populate("reviews");

  if (!content) {
    return next(new AppError("Could not find this content", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      content,
    },
  });
};

exports.updateContent = async (req, res, next) => {
  const { id } = req.params;

  const content = await Content.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!content) {
    return next(new AppError("Could not find the content this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      content,
    },
  });
};

exports.deleteContent = async (req, res, next) => {
  const { id } = req.params;

  const content = await content.findByIdAndDelete(id);

  if (!content) {
    return next(new AppError("Could not find the content with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

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
