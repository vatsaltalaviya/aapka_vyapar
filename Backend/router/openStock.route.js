const express = require('express');
const router = express.Router();
const {addOpenStock, updateOpenStock, deleteOpenStock} = require('../controller/openingStock.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addOpenStock)
router.put('/:id', authUser ,updateOpenStock)
router.delete('/:id', authUser ,deleteOpenStock)
module.exports = router;