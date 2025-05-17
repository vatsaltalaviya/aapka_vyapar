const express = require('express');
const router = express.Router();
const {basicDetails , updateBusinessDetails} = require('../controller/business.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/basic-details', authUser, basicDetails);
router.put('/basic-details/:id', authUser, updateBusinessDetails);


module.exports = router;