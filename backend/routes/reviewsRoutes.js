const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/reviews', reviewsController.getAllReviews);

module.exports = router;
