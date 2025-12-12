const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const stationController = require("../controllers/stationController");

router.get("/stations", isAdmin, stationController.getStations);

router.get("/add-station", isAdmin, stationController.getAddStation);
router.post("/add-station", isAdmin, stationController.postAddStation);

router.get("/stations/:id", isAdmin, stationController.getEditStation);
router.post("/stations/:id", isAdmin, stationController.postEditStation);
router.post("/stations/:id/delete", isAdmin, stationController.deleteStation);

module.exports = router;
