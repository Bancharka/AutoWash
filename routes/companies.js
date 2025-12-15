const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const companyController = require("../controllers/companyController");

router.get("/add-company", isAdmin, companyController.getCompany);
router.post("/add-company", isAdmin, companyController.postCompany);

module.exports = router;
