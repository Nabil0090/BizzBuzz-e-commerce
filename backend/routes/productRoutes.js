const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products/:id', productController.getAllProducts);
router.post('/insertProducts', productController.insertProduct);
router.get('/products/seller/:sellerId', productController.getProductsBySeller);
router.get('/getproducts/:id', productController.getProductById);
router.put('/updateProducts/:id', productController.updateProduct);

module.exports = router;
