const mongoose = require('mongoose')

const PurchaseSchema = mongoose.Schema({
    purchasePrice: {
            type: Number,
            required: false,
        },
})

module.exports = mongoose.model('purchasePrice',PurchaseSchema)