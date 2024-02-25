const express = require("express");
const router = express.Router();
const {
  index,
  getAdd,
  create,
  view,
  deleteUser,
  edit,
  updateUser,
  search,
} = require("../controller/userController");

router.get("/", index);
router.get("/add", getAdd);
router.post("/add", create);
router.get("/view/:id", view);
router.delete("/delete/:id", deleteUser);
router.get("/edit/:id", edit);
router.put("/update/:id", updateUser);
router.post("/search", search);

module.exports = router;
