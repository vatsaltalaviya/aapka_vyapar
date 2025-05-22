const express = require('express');
const router = express.Router();
const {additemLocation, updateitemLocation, deleteitemLocation} = require('../../controller/ItemFieldController/itemLocaton.controller');
const {authUser} = require('../../middleware/auth.middleware');

router.post('/', authUser ,additemLocation)
router.put('/:id', authUser ,updateitemLocation)
router.delete('/:id', authUser ,deleteitemLocation)
module.exports = router;