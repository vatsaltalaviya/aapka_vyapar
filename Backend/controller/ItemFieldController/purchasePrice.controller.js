const PurchasePriceModel = require('../../models/ItemFieldModels/purchasePrice')

module.exports.addPurchasePrice = async (req, res) => {
    try {
        const {purchasePrice} = req.body;
        if (!purchasePrice) {
            return res.status(400).json({ message: 'purchasePrice is required' });
        }

        const stockPriceData = await PurchasePriceModel.create({purchasePrice})
        res.status(201).json({
            message: 'purchasePrice added successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updatePurchasePrice = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {purchasePrice} = req.body;
        if (!purchasePrice) {
            return res.status(400).json({ message: 'purchasePrice is required' });
        }

        const stockPriceData = await PurchasePriceModel.findOne({_id:id})

        stockPriceData.purchasePrice = purchasePrice;
        stockPriceData.save()

        res.status(200).json({
            message: 'purchasePrice updated successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deletePurchasePrice = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const stockPriceData = await PurchasePriceModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'purchasePrice delete successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}