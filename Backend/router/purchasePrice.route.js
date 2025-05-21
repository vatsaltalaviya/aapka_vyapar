const express = require('express');
const router = express.Router();
const {addPurchasePrice, updatePurchasePrice, deletePurchasePrice} = require('../controller/purchasePrice.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addPurchasePrice)
router.put('/:id', authUser ,updatePurchasePrice)
router.delete('/:id', authUser ,deletePurchasePrice)
module.exports = router;