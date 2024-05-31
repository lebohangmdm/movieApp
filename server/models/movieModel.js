const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
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
  coverImage: String,
  director: {
    type: String,
    required: [true, "Please provide the director of them movie"],
  },
  actors: {
    type: [String],
    required: [true, "Please provide the actors of them movie"],
  },
  video: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
