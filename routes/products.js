const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

router.get("/products", isAdmin, productController.getProducts);

router.get("/add-product", isAdmin, productController.getAddProduct);
router.post("/add-product", isAdmin, productController.postAddProduct);

module.exports = router;
