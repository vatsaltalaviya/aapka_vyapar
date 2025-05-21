const mongoose = require('mongoose');

const itemData = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    itemcode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barcode',
        required: true,
    
    },
    itemCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    HSNCode:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'HSN',
        required: true,
    },
     unit:{
                primaryUnit: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Unit',
                    required: true
                },
                secondaryUnit: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'SecondaryUnit',
                    required: false
                }
            },
    Pricing: 
        {
            salePrice: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'SalePrice',
                required: false,
                trim: true
            },
            Discount: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'discount',
                required: false,
                min: 0
            },
          
            withTax: {
                type: Boolean,
                default: false
            },
        },
        stock: {
            quantity: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"openingStock",
              
            },
            stockPrice:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'stockPrice',
               
            },
            minimumStock: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'minstock'
            },
            stockDate: {
                type: mongoose.Schema.Types.ObjectId ,
                ref:'stockDate'
            },
            itemLocation: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'itemLocation'
            }
        },
        purchasePrice: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'purchasePrice'
        },
        tax: {
                type: Number,
                required: function() {
                    return this.Pricing?.withTax;
                }
            },
        // totalStockAmount:{
        //     type: Number,
        //     required: false,
        //     default: 0
        // },
    businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BusinessDetails',
                required: true
            },
})

module.exports = mongoose.model('itemData', itemData);