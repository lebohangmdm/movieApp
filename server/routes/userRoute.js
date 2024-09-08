const router = require("express").Router();
const userController = require("../controller/userController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/profile/me", userController.getMyProfile, userController.getUser);

router.patch(
  "/profile/update",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMyProfile
);
router.delete("/profile/delete", userController.deleteMyProfile);

router
  .route("/favorites")
  .post(restrictTo("user", "admin"), userController.addLikedContent)
  .delete(restrictTo("user", "admin"), userController.deleteLikedContent);

router
  .route("/my-list")
  .post(restrictTo("user", "admin"), userController.addContent)
  .delete(restrictTo("user", "admin"), userController.removeContent);

router.use(restrictTo("admin"));

router.get("/", userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
