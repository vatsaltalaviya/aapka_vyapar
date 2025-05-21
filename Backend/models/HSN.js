const mongoose = require('mongoose');

const HSNSchema = new mongoose.Schema({
    hsnCode: {
        type: bol,
        required: true,
        default: ''
    },
  
}, { timestamps: true });

module.exports = mongoose.model('HSN', HSNSchema);