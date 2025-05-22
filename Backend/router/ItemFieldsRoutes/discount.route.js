const express = require('express');
const router = express.Router();
const {addDiscount, updateDiscount, deleteDiscount} = require('../../controller/ItemFieldController/discount.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addDiscount)
router.put('/:id', authUser ,updateDiscount)
router.delete('/:id', authUser ,deleteDiscount)
module.exports = router;