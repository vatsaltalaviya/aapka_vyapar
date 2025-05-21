const SecondaryUnitModel = require('../models/SecondaryUnit');

module.exports.addSecondaryUnit = async (req, res) => {
    const {secondaryUnit} = req.body;

    try {
        if (!secondaryUnit) {
            return res.status(400).json({ message: 'secondaryUnit name is required' });
        }

        const secondaryUnitData = await SecondaryUnitModel.create({secondaryUnit})
        res.status(201).json({
            message: 'secondaryUnit added successfully',
            data: secondaryUnitData
        });

    } catch (error) {
        console.error('Error adding secondaryUnit:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateSecondaryUnit = async(req,res)=>{
    const {id}= req.params;
    const {secondaryUnit} = req.body;

    try {
        if (!secondaryUnit) {
            return res.status(400).json({ message: 'secondaryUnit name is required' });
        }

        const secondaryUnitData = await SecondaryUnitModel.findOne({_id:id})

        secondaryUnitData.secondaryUnit = secondaryUnit;
        secondaryUnitData.save();

        res.status(200).json({
            message: 'secondaryUnit Update successfully',
            data: secondaryUnitData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}
module.exports.deleteSecondaryUnit = async(req,res)=>{
     const {id}= req.params;

    try {
        const secondaryUnitData = await SecondaryUnitModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'secondaryUnit Update successfully',
            data: secondaryUnitData
        });

    } catch (error) {
        console.error('Error adding secondaryUnit:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}