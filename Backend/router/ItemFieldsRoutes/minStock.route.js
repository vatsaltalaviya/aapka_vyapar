const express = require('express');
const router = express.Router();
const {addMinStock, updateMinStock, deleteMinStock} = require('../../controller/ItemFieldController/minStockQuantitiy.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addMinStock)
router.put('/:id', authUser ,updateMinStock)
router.delete('/:id', authUser ,deleteMinStock)
module.exports = router;