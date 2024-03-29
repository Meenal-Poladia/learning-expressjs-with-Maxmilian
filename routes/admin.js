const express = require('express');

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

//admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/editing-product/:productId', adminController.getEditProduct);

router.post("/editing-product", adminController.postEditProduct);

router.post("/delete-product", adminController.deleteProduct);

module.exports = router;