const BarcodeModel = require('../models/Barcode');

module.exports.addBarcode = async (req, res) => {
    const {barcode} = req.body;
    try {
        if (!barcode) {
            return res.status(400).json({ message: 'Barcode is required' });
        }

        const barcodeData = await BarcodeModel.create({barcode})
        res.status(201).json({
            message: 'barcode added successfully',
            data: barcodeData
        });

    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
module.exports.updateBarcode = async (req ,res)=>{
    try {
        
         const { id } = req.params;
         const {barcode} = req.body;
         if (!barcode) {
            return res.status(400).json({ message: 'Barcode is required' });
        }


        const barcodeData = await BarcodeModel.findOne({_id:id})

        barcodeData.barcode = barcode;
        barcodeData.save()

        res.status(200).json({
            message: 'barcode updated successfully',
            data: barcodeData
        });

    } catch (error) {
     
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteBarcode = async (req,res) =>{
    const {id} = req.params;
    console.log(id)
     
     try {
        const barcodeData = await BarcodeModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'Barcode delete successfully',
            data: barcodeData
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
        
    }
}