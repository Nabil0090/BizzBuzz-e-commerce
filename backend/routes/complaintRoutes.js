const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/complaints', complaintController.getAllComplaints);

module.exports = router;
