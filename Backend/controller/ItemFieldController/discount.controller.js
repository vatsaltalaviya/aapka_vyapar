const DiscountModel = require('../../models/ItemFieldModels/discount')

module.exports.addDiscount = async (req, res) => {
    try {
        const {Discount} = req.body;
        if (!Discount) {
            return res.status(400).json({ message: 'Discount is required' });
        }

        const discountData = await DiscountModel.create({Discount})
        res.status(201).json({
            message: 'Discount added successfully',
            data: discountData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateDiscount = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {Discount} = req.body;
        if (!Discount) {
            return res.status(400).json({ message: 'Discount is required' });
        }

        const discountData = await DiscountModel.findOne({_id:id})

        discountData.Discount = Discount;
        discountData.save()

        res.status(200).json({
            message: 'Discount updated successfully',
            data: discountData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteDiscount = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const discountData = await DiscountModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'Discount delete successfully',
            data: discountData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}