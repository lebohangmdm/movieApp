const router = require("express").Router();
const authController = require("../controller/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.patch("/change-password", protect, authController.updatePassword);

module.exports = router;
