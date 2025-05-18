const mongoose = require('mongoose');

const itemData = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    itemcode: {
        type: String,
        required: true,
    
    },
    itemCategory:{
        type: String,
        required: true,
    },
    HSNCode:{
        type: String,
        required: true,
    },
    Pricing: 
        {
            salePrice: {
                type: Number,
                required: false,
                trim: true
            },
            Discount: {
                type: Number,
                required: false,
                min: 1
            },
          
            withTax: {
                type: Boolean,
                default: false
            },
            
            
        },
        stock: {
            quantity: {
                type: Number,
                required: false,
                min: 0
            },
            
            stockPrice:{
                type: Number,
                required: false,  
            },
            minimumStock: {
                type: Number,
                required: false,
                min: 0
            },
            stockDate: {
                type: Date,
                default: Date.now
            },
            itemLocation: {
                type: String,
                required: false
            }
        },
        purchasePrice: {
            type: Number,
            required: false,
            trim: true
        },
        tax: {
                type: Number,
                required: function() {
                    return this.withTax;
                }
            },
        totalStockAmount:{
            type: Number,
            required: false,
            default: 0
        },
    businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BusinessDetails',
                required: true
            },
})

module.exports = mongoose.model('itemData', itemData);