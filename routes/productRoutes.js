const express= require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/products", productController.create_product);

router.get("/products", productController.products);

router.get("/products/:id", productController.singleProduct);

router.delete("/products/:id", productController.deleteProduct);

router.put("/products/:id", productController.updateProduct);

module.exports = router;