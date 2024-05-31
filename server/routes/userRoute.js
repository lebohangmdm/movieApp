const router = require("express").Router();
const userController = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, userController.getUserById);
router.use(protect);

router.get(
  "/profile/me",
  userController.getMyProfile,
  userController.getUserById
);
router.patch("/profile/update", userController.updateMyProfile);
router.delete("/profile/delete", userController.deleteMyProfile);

module.exports = router;
