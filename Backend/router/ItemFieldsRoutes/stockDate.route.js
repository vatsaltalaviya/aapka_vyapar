const express = require('express');
const router = express.Router();
const { addStockDate, updateStockDate, deleteStockDate } = require('../../controller/ItemFieldController/stockDate.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addStockDate)
router.put('/:id', authUser ,updateStockDate)
router.delete('/:id', authUser ,deleteStockDate)
module.exports = router;