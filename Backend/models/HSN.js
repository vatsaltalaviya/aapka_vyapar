const mongoose = require('mongoose');

const HSNSchema = new mongoose.Schema({
    hsnCode: {
        type: String,
        required: true,
        default: ''
    },
  
}, { timestamps: true });

module.exports = mongoose.model('HSN', HSNSchema);