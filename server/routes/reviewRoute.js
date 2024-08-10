const router = require("express").Router({ mergeParams: true });
const reviewController = require("../controller/reviewController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo("user"), reviewController.createReview);

router.use(protect, restrictTo("user", "admin"));
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
