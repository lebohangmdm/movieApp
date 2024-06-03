const router = require("express").Router();
const listController = require("../controller/listController");

router
  .route("/")
  .get(listController.getAllList)
  .post(listController.createList);

router
  .route("/:id")
  .get(listController.getList)
  .patch(listController.updateList)
  .delete(listController.deleteList);

module.exports = router;
