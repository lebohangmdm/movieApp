const Movie = require("../models/movieModel");
const APIFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");

exports.createMovie = async (req, res, next) => {
  const movie = await Movie.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      movie,
    },
  });
};

exports.getAllMovies = async (req, res, next) => {
  const features = new APIFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const movies = await features.query;

  res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
      movies,
    },
  });
};

exports.getMovie = async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findById(id);

  if (!movie) {
    return next(new AppError("Could not find this movie", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};

exports.updateMovie = async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(new AppError("Could not find the movie this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movie,
    },
  });
};

exports.deleteMovie = async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) {
    return next(new AppError("Could not find the movie with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
