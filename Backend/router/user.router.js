const express = require('express');
const router = express.Router();
const {registerUser , loginUser ,changePassword , verifyOtp , resetPassword} = require('../controller/user.controller');


router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/sendOtp',changePassword);
router.post('/verifyOTP',verifyOtp);
router.post('/resetPassword',resetPassword);

module.exports = router;