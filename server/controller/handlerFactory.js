const APIFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");

exports.createOne = (Model) => async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.content) req.body.content = req.params.contentId;

  if (req.file) req.body.coverImage = req.file.filename;

  const doc = await Model.create(req.body);

  console.log(req.body.user);

  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
};

exports.getAll = (Model) => async (req, res, next) => {
  let filter = {};
  if (req.body.content) filter = { movie: req.params.contentId };
  if (req.params.content) filter = { movie: req.params.contentId };

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .searchByTitle();

  const docs = await features.query;

  res.status(200).json({
    status: "success",
    count: docs.length,
    data: {
      docs,
    },
  });
};

exports.getOne = (Model, populateOpts) => async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params.slug);
  console.log(id);

  let queryObj = {};
  queryObj = id ? { _id: id } : { slug: req.params.slug };
  console.log(queryObj);

  let query = Model.findOne(queryObj);
  if (populateOpts) query = Model.findById(id).populate(populateOpts);

  const doc = await query;

  if (!doc) {
    return next(new AppError("Could not find the document with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const { id } = req.params;
  console.log("_id:", id);

  const doc = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("Could not find the document with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const { id } = req.params;

  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    return next(new AppError("Could not find the document with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
