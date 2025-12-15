const router = require("express").Router();
const { isUser } = require("../middleware/auth");
const upload = require("../multer");
const cleaningController = require("../controllers/cleaningController");

router.get("/new-cleaning", isUser, cleaningController.getNewCleaning);
router.post(
  "/new-cleaning",
  isUser,
  upload.fields([
    { name: "beforeImages", maxCount: 8 },
    { name: "afterImages", maxCount: 8 },
  ]),
  cleaningController.postNewCleaning
);

router.get("/view-cleaning/:token", cleaningController.viewCleaning);

module.exports = router;
