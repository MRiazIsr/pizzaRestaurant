const express = require('express');
const router = express.Router();
const reportController = require('../Controllers/reportController');

router.get('/get-by-id', reportController.getReportById);

module.exports = router ;