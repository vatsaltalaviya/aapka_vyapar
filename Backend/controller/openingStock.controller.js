const OpeningStockModel = require('../models/openingStock')

module.exports.addOpenStock = async (req, res) => {
    try {
        const {quantity} = req.body;
        if (!quantity) {
            return res.status(400).json({ message: 'quantity is required' });
        }

        const discountData = await OpeningStockModel.create({quantity})
        res.status(201).json({
            message: 'quantity added successfully',
            data: discountData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateOpenStock = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {quantity} = req.body;
        if (!quantity) {
            return res.status(400).json({ message: 'quantity is required' });
        }

        const discountData = await OpeningStockModel.findOne({_id:id})

        discountData.quantity = quantity;
        discountData.save()

        res.status(200).json({
            message: 'quantity updated successfully',
            data: discountData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteOpenStock = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const discountData = await OpeningStockModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'quantity delete successfully',
            data: discountData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}