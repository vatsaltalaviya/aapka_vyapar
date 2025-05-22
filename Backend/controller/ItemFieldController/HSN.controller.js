const HSNModel = require('../../models/ItemFieldModels/HSN');

module.exports.addHSN = async (req, res) => {
    const {hsnCode} = req.body;
    try {
        if (!hsnCode) {
            return res.status(400).json({ message: 'HSN Code is required' });
        }

        const hsnData = await HSNModel.create({hsnCode})
        res.status(201).json({
            message: 'HSN code added successfully',
            data: hsnData
        });

    } catch (error) {
        console.error('Error adding hsn:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateHSN = async (req,res)=>{
    const { id } = req.params;
     const {hsnCode} = req.body;
    try {
        if (!hsnCode) {
            return res.status(400).json({ message: 'HSN Code is required' });
        }

        const hsnData = await HSNModel.findOne({_id:id});
        hsnData.hsnCode = hsnCode;
        hsnData.save();

        res.status(200).json({
            message: 'HSN code Update successfully',
            data: hsnData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteHSN = async(req,res)=>{
    const {id} = req.params;
    try {
      

        const hsnData = await HSNModel.findOneAndDelete({_id:id});
        
        res.status(200).json({
            message: 'HSN code deletex successfully',
            data: hsnData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}