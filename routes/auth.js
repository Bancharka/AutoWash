const router = require("express").Router();
const { isAuthenticated, isNotAuthenticated } = require("../middleware/auth");
const authController = require("../controllers/authController");

router.get("/", isNotAuthenticated, authController.getLogin);
router.post("/", authController.postLogin);

router.get("/create-user", isNotAuthenticated, authController.getCreateUser);
router.post("/create-user", authController.postCreateUser);

module.exports = router;
