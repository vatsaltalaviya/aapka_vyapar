const express = require('express');
const router = express.Router();
const {registerUser , loginUser ,changePassword , verifyOtp , resetPassword , profile} = require('../controller/user.controller');
const {authUser} = require('../middleware/auth.middleware');


router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/sendOtp',changePassword);
router.post('/verifyOTP',verifyOtp);
router.post('/resetPassword',resetPassword);
router.get('/profile',authUser,profile);

module.exports = router;