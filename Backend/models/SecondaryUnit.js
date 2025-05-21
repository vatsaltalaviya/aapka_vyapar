const mongoose = require('mongoose');

const SecondaryUnitSchema = new mongoose.Schema({
    secondaryUnit: {
        type: String,
        required: true,
        default: ''
    },
    
}, { timestamps: true });

module.exports = mongoose.model('SecondaryUnit', SecondaryUnitSchema);