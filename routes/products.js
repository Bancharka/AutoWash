const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

router.get("/products", isAdmin, productController.getProducts);

router.get("/add-product", isAdmin, productController.getAddProduct);
router.post("/add-product", isAdmin, productController.postAddProduct);

router.get("/products/:id", isAdmin, productController.getEditProduct);
router.post("/products/:id", isAdmin, productController.postEditProduct);
router.post("/products/:id/delete", isAdmin, productController.deleteProduct);

module.exports = router;
