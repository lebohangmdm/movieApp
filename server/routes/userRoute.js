const router = require("express").Router();
const userController = require("../controller/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, userController.getUserById);
router.use(protect);

router.get(
  "/profile/me",
  userController.getMyProfile,
  userController.getUserById
);
router.patch("/profile/update", userController.updateMyProfile);
router.delete("/profile/delete", userController.deleteMyProfile);

router
  .route("/favorites")
  .post(protect, restrictTo("user"), userController.addLikedMovie)
  .delete(protect, restrictTo("user"), userController.deleteLikedMovie);

router.delete(
  "/favorites/clear",
  protect,
  restrictTo("user"),
  userController.clearLikedMovies
);

module.exports = router;
