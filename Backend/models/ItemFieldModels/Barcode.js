const mongoose = require('mongoose');

const BarcodeSchema = new mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        default: ''
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Barcode', BarcodeSchema);