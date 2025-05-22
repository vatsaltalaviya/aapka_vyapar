const mongoose = require('mongoose')

const DiscountSchema = mongoose.Schema({
    Discount: {
                type: Number,
                required: false,
                min: 0
     }
}) 

module.exports = mongoose.model('discount',DiscountSchema);