const mongoose = require('mongoose')

const stockPriceSchema = mongoose.Schema({
    stockPrice:{
                type: Number,
                required: false,  
            },
})

module.exports = mongoose.model('stockPrice',stockPriceSchema)