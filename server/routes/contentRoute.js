const router = require("express").Router();
const contentController = require("../controller/contentController");
const { restrictTo, protect } = require("../middleware/authMiddleware");
const reviewRouter = require("./reviewRoute");

router.use("/:contentId/reviews", reviewRouter);
router.get("/random", contentController.getRandomContents);

router
  .route("/")
  .get(contentController.getAllContents)
  .post(
    protect,
    contentController.uploadSingleImage,
    contentController.createContent
  );

router
  .route("/:id")
  .get(contentController.getContent)
  .patch(protect, restrictTo("admin"), contentController.updateContent)
  .delete(protect, restrictTo("admin"), contentController.deleteContent);

module.exports = router;
