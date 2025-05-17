const express = require('express');
const router = express.Router();
const {authUser} = require('../middleware/auth.middleware');
const {addItem, getAllItem, updateItem, deleteItem  } = require('../controller/item.controller');

router.post('/addItem', authUser, addItem)
router.get('/getAllItem', authUser, getAllItem )
router.put('/updateItem/:itemid', authUser, updateItem )
router.delete('/deleteItem/:itemid', authUser, deleteItem )

module.exports = router;