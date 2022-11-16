const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/menuController');

router.get('/get-all-positions', todoController.getMenu);
router.post('/create-positions', todoController.createPositions);
router.patch('/update-position', todoController.updatePosition);
router.delete('/delete-positions', todoController.deletePosition);

module.exports = router ;

