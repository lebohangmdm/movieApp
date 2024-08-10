const Review = require("../models/reviewModel");
const {
  getOne,
  deleteOne,
  getAll,
  updateOne,
  createOne,
} = require("./handlerFactory");

exports.createReview = createOne(Review);
exports.getAllReviews = getAll(Review);
exports.updateReview = updateOne(Review);
exports.getReview = getOne(Review);
exports.deleteReview = deleteOne(Review);
