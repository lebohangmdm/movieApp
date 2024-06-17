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
router.patch(
  "/profile/update",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMyProfile
);
router.delete("/profile/delete", userController.deleteMyProfile);

router
  .route("/favorites")
  .post(protect, restrictTo("user"), userController.addLikedContent)
  .delete(protect, restrictTo("user"), userController.deleteLikedContent);

router.delete(
  "/favorites/clear",
  protect,
  restrictTo("user"),
  userController.clearLikedContents
);

module.exports = router;
