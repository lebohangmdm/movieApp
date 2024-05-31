const router = require("express").Router();
const movieController = require("../controller/movieController");

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
