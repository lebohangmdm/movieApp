const router = require("express").Router();
const userController = require("../controller/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.use(protect);

router.get(
  "/profile/me",
  userController.getMyProfile,
  userController.getUserById
);
router.patch(
  "/profile/update",
  protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMyProfile
);
router.delete("/profile/delete", userController.deleteMyProfile);

router
  .route("/favorites")
  .post(restrictTo("user"), userController.addLikedContent)
  .delete(restrictTo("user"), userController.deleteLikedContent);

router.delete(
  "/favorites/clear",
  restrictTo("user"),
  userController.clearLikedContents
);

router.use(restrictTo("admin"));

router.get("/", userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
