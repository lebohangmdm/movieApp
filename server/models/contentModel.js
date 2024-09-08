const mongoose = require("mongoose");
const slugify = require("slugify");

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of them content"],
      unique: [true, "This title is already in use"],
      maxlength: [50, "The title cannot be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide the description of them content"],
      maxlength: [500, "The description cannot be more than 500 characters"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Please provide the duration of them content"],
    },
    ratingsAverage1: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [10, "Rating must be below 10.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    releaseYear: {
      type: String,
      required: [true, "Please provide the release year of them content"],
    },
    releaseDate: {
      type: String,
      required: [true, "Please provide the release date of them content"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    genres: {
      type: [String],
      required: [true, "Please provide the genre of them content"],
    },
    type: {
      type: String,
      enum: {
        values: ["movie", "series"],
        message: "Please provide the given type",
      },
      required: [true, "Please provide the type"],
    },
    totalSeasons: {
      type: String,
      default: "N/A",
      validate: {
        validator: function (value) {
          // `this` refers to the document being validated
          if (this.type === "series") {
            // For series, content must be provided and not 'N/A'
            return value && value !== "N/A";
          }
          // For contents, content can be 'N/A' or anything else
          return true;
        },
        message: `Content is required for series and cannot be 'N/A'`,
      },
    },
    coverImage: {
      type: String,
      default: false,
    },
    poster: {
      type: String,
      required: [true, "Please provide the poster"],
    },
    directors: {
      type: String,
      required: [true, "Please provide the director of the content"],
    },
    cast: {
      type: String,
      required: [true, "Please provide the actors of the content"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    video: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

contentSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "Content",
  localField: "_id",
});

contentSchema.pre("save", function (next) {
  this.genres = this.genres.map((genre) => slugify(genre.toLowerCase()));
  next();
});

// contentSchema.virtual("numOfReviews").get(function () {
//   return this.reviews.length || 0;
// });

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
