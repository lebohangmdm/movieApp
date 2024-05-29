const router = require("express").Router();
const userController = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, userController.getUserById);

module.exports = router;
