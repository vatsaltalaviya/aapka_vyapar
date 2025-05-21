const express = require('express');
const router = express.Router();
const {addStockPrice, updateStockPrice, deleteStockPrice} = require('../controller/stockPrice.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addStockPrice)
router.put('/:id', authUser ,updateStockPrice)
router.delete('/:id', authUser ,deleteStockPrice)
module.exports = router;