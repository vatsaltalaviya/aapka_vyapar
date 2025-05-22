const mongoose = require('mongoose');

const SalePriceSchema = mongoose.Schema({
     salePrice: {
                type: Number,
                required: true,
            }
})
module.exports = mongoose.model('SalePrice',SalePriceSchema);