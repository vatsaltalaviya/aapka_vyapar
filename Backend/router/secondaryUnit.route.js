const express = require('express');
const router = express.Router();
const {addSecondaryUnit, updateSecondaryUnit, deleteSecondaryUnit} = require('../controller/secondaryunit.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addSecondaryUnit)
router.put('/:id', authUser ,updateSecondaryUnit)
router.delete('/:id', authUser ,deleteSecondaryUnit)
module.exports = router;