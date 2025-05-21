const minStockQuantityModel = require('../models/minStockQuantity')

module.exports.addMinStock = async (req, res) => {
    try {
        const {minimumStock} = req.body;
        if (!minimumStock) {
            return res.status(400).json({ message: 'minimumStock is required' });
        }

        const minimumStockData = await minStockQuantityModel.create({minimumStock})
        res.status(201).json({
            message: 'minimumStock added successfully',
            data: minimumStockData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateMinStock = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {minimumStock} = req.body;
        if (!minimumStock) {
            return res.status(400).json({ message: 'minimumStock is required' });
        }

        const minimumStockData = await minStockQuantityModel.findOne({_id:id})

        minimumStockData.minimumStock = minimumStock;
        minimumStockData.save()

        res.status(200).json({
            message: 'minimumStock updated successfully',
            data: minimumStockData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteMinStock = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const minimumStockData = await minStockQuantityModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'minimumStock delete successfully',
            data: minimumStockData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}