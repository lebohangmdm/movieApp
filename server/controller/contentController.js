const Content = require("../models/contentModel");

const {
  deleteOne,
  updateOne,
  getOne,
  getAll,
  createOne,
} = require("./handlerFactory");

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
