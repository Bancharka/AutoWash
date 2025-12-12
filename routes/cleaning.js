const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../multer");
const cleaningController = require("../controllers/cleaningController");

router.get("/new-cleaning", isAuthenticated, cleaningController.getNewCleaning);
router.post(
  "/new-cleaning",
  isAuthenticated,
  upload.fields([
    { name: "beforeImages", maxCount: 8 },
    { name: "afterImages", maxCount: 8 },
  ]),
  cleaningController.postNewCleaning
);

router.get("/view-cleaning/:token", cleaningController.viewCleaning);

module.exports = router;
