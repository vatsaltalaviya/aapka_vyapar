const express = require('express');
const router = express.Router();
const {addsalePrice, updateSalePrice, deleteSalePrice} = require('../../controller/ItemFieldController/salePrice.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addsalePrice)
router.put('/:id', authUser ,updateSalePrice)
router.delete('/:id', authUser ,deleteSalePrice)
module.exports = router;