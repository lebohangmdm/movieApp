const router = require("express").Router({ mergeParams: true });
const reviewController = require("../controller/reviewController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo("user"), reviewController.createReview);

module.exports = router;
