const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboardController");

router.get("/dashboard", isAuthenticated, dashboardController.getDashboard);

module.exports = router;
