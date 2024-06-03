const router = require("express").Router();
const contentController = require("../controller/contentController");
const reviewRouter = require("./reviewRoute");

router.use("/:contentId/reviews", reviewRouter);

router
  .route("/")
  .get(contentController.getAllContents)
  .post(contentController.createContent);

router
  .route("/:id")
  .get(contentController.getContent)
  .patch(contentController.updateContent)
  .delete(contentController.deleteContent);

module.exports = router;
