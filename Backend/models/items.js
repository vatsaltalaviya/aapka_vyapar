const mongoose = require('mongoose');

const itemData = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    items: [
        {
            itemName: {
                type: String,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            unit: {
                type: String,
                required: false,
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            withTax: {
                type: Boolean,
                default: false
            },
            subTotal: Number,
            discount: Number,
            tax: Number,
            totalAmount: Number,
            
        }
    ],
    paymentType: {
                type: String,
                enum: ['Cash', 'Card', 'Check' , 'Upi', 'Net Banking'],
                default: 'Cash',
                required: true
            },
            checkReference: {
                type: String,
                required: function() {
                    return this.paymentType === 'Check';
                }
            },
            stateOfSupply: {
                type: String,
                required:false,
            },
            balanceDue: {
                type: Number,
                default: 0,
                required: false,
            },
    businessId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BusinessDetails',
                required: true
            },
})

module.exports = mongoose.model('itemData', itemData);