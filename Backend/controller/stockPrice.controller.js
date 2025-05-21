const stockPriceModel = require('../models/stockPrice')

module.exports.addStockPrice = async (req, res) => {
    try {
        const {stockPrice} = req.body;
        if (!stockPrice) {
            return res.status(400).json({ message: 'stockPrice is required' });
        }

        const stockPriceData = await stockPriceModel.create({stockPrice})
        res.status(201).json({
            message: 'stockPrice added successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateStockPrice = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {stockPrice} = req.body;
        if (!stockPrice) {
            return res.status(400).json({ message: 'stockPrice is required' });
        }

        const stockPriceData = await stockPriceModel.findOne({_id:id})

        stockPriceData.stockPrice = stockPrice;
        stockPriceData.save()

        res.status(200).json({
            message: 'stockPrice updated successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteStockPrice = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const stockPriceData = await stockPriceModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'stockPrice delete successfully',
            data: stockPriceData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}