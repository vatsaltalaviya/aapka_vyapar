const itemData = require('../models/items');
const BusinessDetails = require('../models/BusinessDetails');

const calculateTotal = (item) => {
    const subTotal = item.stock.quantity * item.Pricing.salePrice;
    const discount = (subTotal * item.Pricing.Discount) / 100;
    let tax = 0;
    let totalAmount = subTotal;

    if (item.Pricing.withTax) {
        tax = (subTotal * item.tax) / 100;
        totalAmount = subTotal - discount + tax;
    } else {
        totalAmount = subTotal - discount;
    }

    const totalStockAmount = item.stock.quantity * item.stock.stockPrice;

    return { subTotal, discount, tax, totalAmount, totalStockAmount };
};


//add item
module.exports.addItem = async (req, res) => {
    const {
        itemName,
        itemcode,
        itemCategory,
        HSNCode,
        Pricing,
        stock,
        purchasePrice,
        tax
    } = req.body;

    const userId = req.user._id;

    // Validation
    if (!itemName || !itemcode || !itemCategory || !HSNCode || !Pricing || !stock) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const business = await BusinessDetails.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const totals = calculateTotal({ Pricing, stock, tax });

        const newItem = await itemData.create({
            itemName,
            itemcode,
            itemCategory,
            HSNCode,
            Pricing,
            stock,
            purchasePrice,
            tax,
            totalStockAmount: totals.totalStockAmount,
            businessId: business._id
        });

        res.status(201).json({ message: "Item added successfully", data: newItem });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Get all items
module.exports.getAllItem = async (req, res) => {
    const userId = req.user._id;

    try {
        const business = await BusinessDetails.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

         const items = await itemData.find({ businessId: business._id });
        res.status(200).json({ message: "Items fetched successfully", data: items });

    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

// Update item
module.exports.updateItem = async (req, res) => {
    const { itemid } = req.params;
     const {
        itemName,
        itemcode,
        itemCategory,
        HSNCode,
        Pricing,
        stock,
        purchasePrice,
        tax
    } = req.body;

    const userId = req.user._id;

    // Validation
    if (!itemName || !itemcode || !itemCategory || !HSNCode || !Pricing || !stock) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }
    try {
        const business = await BusinessDetails.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const existingItem = await itemData.findOne({ _id: itemid, businessId: business._id });
        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Calculate totals for new items
       const totals = calculateTotal({ Pricing, stock, tax });
        // Update item data
         existingItem.itemName = itemName;
        existingItem.itemcode = itemcode;
        existingItem.itemCategory = itemCategory;
        existingItem.HSNCode = HSNCode;
        existingItem.Pricing = Pricing;
        existingItem.stock = stock;
        existingItem.purchasePrice = purchasePrice;
        existingItem.tax = tax;
        existingItem.totalStockAmount = totals.totalStockAmount;

        await existingItem.save();
        res.status(200).json({ message: "Item updated successfully", data: existingItem });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
// Delete item
module.exports.deleteItem = async (req, res) => {
    const { itemid } = req.params;
    const userId = req.user._id;

    try {
        const business = await BusinessDetails.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }   
        const item = await itemData.findOneAndDelete({ _id: itemid, businessId: business._id });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }   
        res.status(200).json({ message: "Item deleted successfully", data: item });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}
