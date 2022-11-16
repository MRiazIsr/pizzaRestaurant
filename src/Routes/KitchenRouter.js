const express = require('express');
const router = express.Router();
const kitchenController = require('../Controllers/KitchenController');

router.post('/make-pizza', kitchenController.ordersPreparing);

module.exports = router ;