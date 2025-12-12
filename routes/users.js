const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/users", isAdmin, userController.getUsers);

router.get("/add-user", isAdmin, userController.getAddUser);
router.post("/add-user", isAdmin, userController.postAddUser);

router.get("/users/:id", isAdmin, userController.getEditUser);
router.post("/users/:id", isAdmin, userController.postEditUser);
router.post("/users/:id/delete", isAdmin, userController.deleteUser);

module.exports = router;
