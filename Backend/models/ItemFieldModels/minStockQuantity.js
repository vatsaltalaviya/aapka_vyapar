const mongoose = require('mongoose')

const MinStockSchema = mongoose.Schema({
     minimumStock: {
                type: Number,
                required: false,
                min: 0
            },
})

module.exports = mongoose.model('minstock',MinStockSchema)