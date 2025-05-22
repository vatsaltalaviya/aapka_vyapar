const mongoose = require('mongoose')

const itemLocationSchema = mongoose.Schema({
    itemLocation: {
                type: String,
                required: false
            }
})

module.exports = mongoose.model('itemlocation',itemLocationSchema)