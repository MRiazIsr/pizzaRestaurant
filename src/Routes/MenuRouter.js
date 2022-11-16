const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/MenuController');

router.get('/get-all-positions', menuController.getMenu);
router.post('/create-positions', menuController.createPositions);
router.patch('/update-position', menuController.updatePosition);
router.delete('/delete-position', menuController.deletePosition);

module.exports = router ;