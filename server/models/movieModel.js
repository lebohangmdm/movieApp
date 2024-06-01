const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of them movie"],
      unique: [true, "This name is already in use"],
      maxlength: [50, "The name cannot be more than 50 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide the description of them movie"],
      maxlength: [250, "The name cannot be more than 50 characters"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Please provide the duration of them movie"],
    },
    rating: {
      type: Number,
      default: 1,
    },
    totalRatings: {
      type: Number,
    },
    releaseYear: {
      type: Number,
      required: [true, "Please provide the release year of them movie"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Please provide the release date of them movie"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    genres: {
      type: Array,
      required: [true, "Please provide the genre of them movie"],
    },
    type: {
      type: String,
      enum: {
        values: ["Movie", "Series"],
        message: "Please provide the given type",
      },
      required: [true, "Please provide the type"],
    },
    seasonsNumber: {
      type: String,
      default: "N/A",
      validate: {
        validator: function (value) {
          // `this` refers to the document being validated
          if (this.type === "series") {
            // For series, content must be provided and not 'N/A'
            return value && value !== "N/A";
          }
          // For movies, content can be 'N/A' or anything else
          return true;
        },
        message: `Content is required for series and cannot be 'N/A'`,
      },
    },
    coverImage: String,
    directors: {
      type: [String],
      required: [true, "Please provide the director of them movie"],
    },
    cast: {
      type: [String],
      required: [true, "Please provide the actors of them movie"],
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

movieSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "movie",
  localField: "_id",
});

movieSchema.virtual("numOfReviews").get(function () {
  return this.reviews.length;
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
