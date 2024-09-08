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

  let updateData;
  if (stats.length > 0) {
    updateData = {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal place
    };
  } else {
    updateData = {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    };
  }

  console.log(stats);

  const content = await Content.findByIdAndUpdate(contentId, updateData, {
    new: true,
    runValidators: true,
  });
  console.log(content);
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatings(this.content);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.content);
  }
});
7 
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
