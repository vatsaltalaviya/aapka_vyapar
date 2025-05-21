const StockDateModel = require('../models/stockDate')

module.exports.addStockDate = async (req, res) => {
    try {
        const {stockDate} = req.body;
        if (!stockDate) {
            return res.status(400).json({ message: 'stockDate is required' });
        }

        const stockDateData = await StockDateModel.create({stockDate})
        res.status(201).json({
            message: 'stockDate added successfully',
            data: stockDateData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateStockDate = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {stockDate} = req.body;
        if (!stockDate) {
            return res.status(400).json({ message: 'stockDate is required' });
        }

        const stockDateData = await StockDateModel.findOne({_id:id})

        stockDateData.stockDate = stockDate;
        stockDateData.save()

        res.status(200).json({
            message: 'stockDate updated successfully',
            data: stockDateData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteStockDate = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const stockDateData = await StockDateModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'stockDate delete successfully',
            data: stockDateData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}