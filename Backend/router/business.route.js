const express = require('express');
const router = express.Router();
const {basicDetails , updateBusinessDetails, deleteBusinessDetails, getBusinessDetails} = require('../controller/business.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/basic-details', authUser, basicDetails);
router.put('/basic-details/:id', authUser, updateBusinessDetails);
// router.get('/get-details', authUser, getBusinessDetails);
// router.delete('/deleteBusiness/:id', authUser, deleteBusinessDetails);


module.exports = router;