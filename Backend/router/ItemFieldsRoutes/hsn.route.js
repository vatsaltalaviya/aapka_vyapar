const express = require('express');
const router = express.Router();
const {addHSN, updateHSN, deleteHSN} = require('../../controller/ItemFieldController/HSN.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,addHSN)
router.put('/:id', authUser ,updateHSN)
router.delete('/:id', authUser ,deleteHSN)
module.exports = router;