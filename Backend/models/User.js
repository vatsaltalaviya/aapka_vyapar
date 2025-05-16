const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  otp:{
    type: Number,
    default: 0,
  },
   otpexpiresAt:   { type: Date }
})

module.exports = mongoose.model('User', userSchema);