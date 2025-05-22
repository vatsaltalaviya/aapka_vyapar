const mongoose = require('mongoose')

const stockDateSchema = mongoose.Schema({
     stockDate: {
                type: Date,
                default: Date.now
            },
})

module.exports = mongoose.model('stockDate',stockDateSchema)