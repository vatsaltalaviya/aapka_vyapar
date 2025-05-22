const mongoose = require('mongoose')

const OpeningStockSchema = mongoose.Schema({
    quantity: {
                type: Number,
                required: false,
                min: 0
            }
})

module.exports = mongoose.model('openingStock',OpeningStockSchema)