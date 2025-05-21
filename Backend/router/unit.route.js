const express = require('express');
const router = express.Router();
const {addUnit, updateUnit, deleteUnit} = require('../controller/unit.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addUnit)
router.put('/:id', authUser ,updateUnit)
router.delete('/:id', authUser ,deleteUnit)
module.exports = router;