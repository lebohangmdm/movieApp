const mongoose = require("mongoose");
const Content = require("./contentModel");

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

reviewSchema.index({ content: 1, user: 1 }, { unique: true });

reviewSchema.pre("save", function (next) {
  this.populate("user");
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

reviewSchema.statics.calcAverageRatings = async function (contentId) {
  const stats = await this.aggregate([
    {
      $match: { content: contentId },
    },
    {
      $group: {
        _id: "$content",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);

  if (stats.length > 0) {
    await Content.findByIdAndUpdate(contentId, {
      ratingsQuantity: stats[0].nRating, // Changed from totalRatings to ratingsQuantity
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Content.findByIdAndUpdate(contentId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.content);
});

// findByIdAndUpdate
// findByIdAndDelete

reviewSchema.post(/^findOneAnd/, async function (doc) {
  console.log(doc);
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.content);
  }
});

// reviewSchema.post(/^findOneAnd/, async function () {
//   // await this.findOne(); does NOT work here, query has already executed

//   await this.r.constructor.calcAverageRatings(this.r.content);
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
