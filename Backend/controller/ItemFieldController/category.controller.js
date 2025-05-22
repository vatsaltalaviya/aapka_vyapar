const CategoryModel = require('../../models/ItemFieldModels/Category');

module.exports.addCategory = async (req, res) => {
    try {
        const {categoryName} = req.body;
        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const categorydata = await CategoryModel.create({categoryName})
        res.status(201).json({
            message: 'Category added successfully',
            data: categorydata
        });

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.updateCategory = async (req ,res)=>{
    try {
        
         const { id } = req.params;
          const {categoryName} = req.body;
        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const categorydata = await CategoryModel.findOne({_id:id})

        categorydata.categoryName = categoryName;
        categorydata.save()

        res.status(200).json({
            message: 'Category updated successfully',
            data: categorydata
        });

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

module.exports.deleteCategory = async (req,res) =>{
    const {id} = req.params;
     
     try {
        const categorydata = await CategoryModel.findOneAndDelete({_id:id})

        res.status(200).json({
            message: 'Category delete successfully',
            data: categorydata
        });

    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}