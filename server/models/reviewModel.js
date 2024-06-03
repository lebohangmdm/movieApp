const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please provide your comment"],
    maxlength: [500, "The comment cannot exceed 500 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide your rating"],
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: [true, "Review must have a content"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must have a user"],
  },
});

reviewSchema.pre("save", function (next) {
  this.populate("user");
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
