const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/carts', cartController.getAllCarts);

module.exports = router;
