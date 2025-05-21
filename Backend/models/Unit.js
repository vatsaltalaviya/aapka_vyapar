const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
    unitName: {
        type: String,
        required: true,
        default: ''
    },
   
    
}, { timestamps: true });

module.exports = mongoose.model('Unit', UnitSchema);