const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const companyController = require("../controllers/companyController");

router.get("/addCompanies", isAdmin, companyController.getCompanies);
router.post("/addCompanies", isAdmin, companyController.postCompanies);

module.exports = router;
