const mongoose = require('mongoose');

const businessDetailsSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        default: ''
    },
    GstNo: {
        type: String,
        required: true,
        default: ''
    },
    businessPhoneNumber1: {
        type: String,
        required: true,
        default: null
    },
    businessPhoneNumber2: {
        type: String,
        required: true,
        default: null
    },
    businessAddress: {
        type: String,
        required: true,
        default: ''
    },
    
    businessEmail: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
     businessPincode: {
        type: Number,
        required: true,
        default: null
    },
    businessDescription: {
        type: String,
        required: false,
        default: ''
    },
    signature: {
        type: String,
        required: false,
        default: ''
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference to User model
    required: true,
    }
}, { timestamps: true });

module.exports= mongoose.model('BusinessDetails', businessDetailsSchema);