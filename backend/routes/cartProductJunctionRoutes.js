const express = require('express');
const router = express.Router();
const cartProductJunctionController = require('../controllers/cartProductJunctionController');

router.get('/cart-products', cartProductJunctionController.getAllCartProducts);

module.exports = router;
