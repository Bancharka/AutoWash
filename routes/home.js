const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const homeController = require("../controllers/homeController");

router.get("/", isAuthenticated, homeController.getHome);

module.exports = router;
