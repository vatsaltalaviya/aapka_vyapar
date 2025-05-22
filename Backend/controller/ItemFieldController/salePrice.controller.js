const SalePriceModel = require('../../models/ItemFieldModels/salePrice')

module.exports.addsalePrice = async (req, res) => {
    try {
        const {salePrice} = req.body;
        if (!salePrice) {
            return res.status(400).json({ message: 'salePrice is required' });
        }

        const salePricedata = await SalePriceModel.create({salePrice})
        res.status(201).json({
            message: 'SalePrice added successfully',
            data: salePricedata
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateSalePrice = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {salePrice} = req.body;
        if (!salePrice) {
            return res.status(400).json({ message: 'salePrice is required' });
        }

        const salePricedata = await SalePriceModel.findOne({_id:id})

        salePricedata.salePrice = salePrice;
        salePricedata.save()

        res.status(200).json({
            message: 'salePrice updated successfully',
            data: salePricedata
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteSalePrice = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const salePricedata = await SalePriceModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'salePrice delete successfully',
            data: salePricedata
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}