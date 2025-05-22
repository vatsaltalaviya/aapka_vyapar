const express = require('express');
const router = express.Router();
const {addBarcode, updateBarcode, deleteBarcode} = require('../../controller/ItemFieldController/barcode.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addBarcode)
router.put('/:id', authUser ,updateBarcode)
router.delete('/:id', authUser ,deleteBarcode)
module.exports = router;