const itemData = require('../models/items');
const BusinessDetails = require('../models/BusinessDetails');

const calculateTotal = (item) => {
    let subTotal = item.quantity * item.price;
    let discount = (subTotal * item.discount) / 100;
    let tax = item.tax || 0;
    let totalAmount = subTotal;

    if (item.withTax) {
        tax = (subTotal * 0.18);
        totalAmount = subTotal - discount + tax;
    } else {
        totalAmount = subTotal - discount;
    }

    return { subTotal, discount, tax, totalAmount };
}

module.exports.addItem = async (req, res) => {
    const { customerName, phoneNumber, items } = req.body;
    const userId = req.user._id;

    if (!customerName || !phoneNumber || !items) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Items array is required and cannot be empty" });
    }

    for (const item of items) {
        if (!item.itemName || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
            return res.status(400).json({ message: "Each item must have itemName, price (number) and quantity (number)" });
        }
    }

    try {
        const business = await BusinessDetails.findOne({ userId });
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const itemDataArray = items.map(item => ({
            ...item,
            ...calculateTotal(item),
        }));

        const newItem = {
            customerName,
            phoneNumber,
            items: itemDataArray,
            businessId: business._id
        };

        const item = await itemData.create(newItem);
        res.status(201).json({ message: "Item added successfully", data: item });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

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

module.exports.updateItem = async (req, res) => {
    const { itemid } = req.params;
    const { customerName, phoneNumber, items } = req.body;
    const userId = req.user._id;

    if (!customerName || !phoneNumber || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check every item has required fields
    for (let item of items) {
        if (!item.itemName || !item.quantity || !item.unit || !item.price || item.discount === undefined || item.withTax === undefined) {
            return res.status(400).json({ message: "Each item must have itemName, quantity, unit, price, discount, and withTax" });
        }
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
        const updatedItems = items.map(item => ({
            ...item,
            ...calculateTotal(item),
        }));

        // Update item data
        existingItem.customerName = customerName;
        existingItem.phoneNumber = phoneNumber;
        existingItem.items = updatedItems;

        await existingItem.save();

        res.status(200).json({ message: "Item updated successfully", data: existingItem });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

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
