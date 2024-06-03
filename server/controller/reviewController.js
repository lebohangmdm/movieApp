const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.content) req.body.content = req.params.contentId;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
};

exports.getAllReviews = async (req, res) => {
  let filter = {};
  if (req.body.movieId) filter = { movie: req.params.movieId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
};
