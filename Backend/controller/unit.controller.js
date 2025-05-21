const UnitModel = require('../models/Unit');

module.exports.addUnit = async (req, res) => {
    try {
        const {unitName} = req.body;
        if (!unitName) {
            return res.status(400).json({ message: 'Unit name is required' });
        }

        const Unitdata = await UnitModel.create({unitName})
        res.status(201).json({
            message: 'Unit added successfully',
            data: Unitdata
        });

    } catch (error) {
        console.error('Error adding unit:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateUnit = async(req,res)=>{
    try {
        const {id} = req.params;
        const {unitName} = req.body;
        if (!unitName) {
            return res.status(400).json({ message: 'Unit name is required' });
        }

        const Unitdata = await UnitModel.findOne({_id:id})

        Unitdata.unitName = unitName;
        Unitdata.save();

        res.status(200).json({
            message: 'Unit update successfully',
            data: Unitdata
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteUnit = async(req,res)=>{
    try {
        const {id} = req.params;
       

        const Unitdata = await UnitModel.findByIdAndDelete({_id:id})
        res.status(200).json({
            message: 'Unit delete successfully',
            data: Unitdata
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}