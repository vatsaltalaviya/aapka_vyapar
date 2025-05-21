const express = require('express');
const router = express.Router();
const {addCategory,updateCategory,deleteCategory} = require('../controller/category.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/', authUser ,addCategory)
router.put('/:id', authUser ,updateCategory)
router.delete('/:id', authUser ,deleteCategory)
module.exports = router;