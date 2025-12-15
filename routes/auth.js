const router = require("express").Router();
const { isAuthenticated, isNotAuthenticated } = require("../middleware/auth");
const authController = require("../controllers/authController");

router.get("/login", isNotAuthenticated, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/register", isNotAuthenticated, authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/logout", isAuthenticated, authController.getLogout);

module.exports = router;
