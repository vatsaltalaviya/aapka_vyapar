const itemLocationkModel = require('../../models/ItemFieldModels/itemLocation')

module.exports.additemLocation = async (req, res) => {
    try {
        const {itemLocation} = req.body;
        if (!itemLocation) {
            return res.status(400).json({ message: 'itemLocation is required' });
        }

        const itemLocationData = await itemLocationkModel.create({itemLocation})
        res.status(201).json({
            message: 'itemLocation added successfully',
            data: itemLocationData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateitemLocation = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {itemLocation} = req.body;
        if (!itemLocation) {
            return res.status(400).json({ message: 'itemLocation is required' });
        }

        const itemLocationData = await itemLocationkModel.findOne({_id:id})

        itemLocationData.itemLocation = itemLocation;
        itemLocationData.save()

        res.status(200).json({
            message: 'itemLocation updated successfully',
            data: itemLocationData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteitemLocation = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const itemLocationData = await itemLocationkModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'itemLocation delete successfully',
            data: itemLocationData
        });

    } catch (error) {
        console.error( error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}