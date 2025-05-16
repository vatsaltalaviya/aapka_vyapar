const UserModel = require('../models/User');
const {sendOTP} = require('../Utils/sendOTP');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


let otpData ={}

module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const isEmail = await UserModel.findOne({email});
    if (isEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        username,
        email,
        password: hashedPassword
        // password
    };

    const user = await UserModel.create(userData);
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.status(201).json({
        message: "User registered successfully",
        token,
        user
    });

}

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // const user = await UserModel.findOne({email , password});
    const user = await UserModel.findOne({email});
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.status(200).json({
        message: "User login successfully",
        token,
        user
    });
  
}

module.exports.changePassword = async (req, res) => {
  const {email} = req.body;
  const user = await UserModel.findOne({email});

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
     const otp = Math.floor(100000 + Math.random() * 900000);
     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

     await UserModel.findOneAndUpdate({email} , {otp , otpexpiresAt: expiresAt} );
     otpData = {email , otp}

     console.log(otpData);
     await sendOTP(email , otp);

     res.status(200).json({
        message: "OTP sent to your email",
        otpData})
}

module.exports.verifyOtp = async (req, res) => {
    const {email , otp} = req.body;
    const user = await UserModel.findOne({email});

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if(user.otpexpiresAt < Date.now()){
        return res.status(400).json({ message: "OTP expired" });
    }

    if(user.otp !== otp){
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if(user.otp === otp){
    
        res.status(200).json({
            message: "OTP verified successfully",
            user
        });
    }
}

module.exports.resetPassword = async (req, res) => {
    const {email , newPassword} = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateUser = await UserModel.findOneAndUpdate({email} , {password: hashedPassword} , {new: true});

    if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
    }

    updateUser.otp = 0;
    updateUser.otpexpiresAt = null;
    await updateUser.save();

     const token = jwt.sign({ id: updateUser._id }, process.env.JWT_SECRET , {
        expiresIn: '1d'
    });

    res.status(200).json({
            message: "updated password successfully",
            token,
            updateUser
        });

}