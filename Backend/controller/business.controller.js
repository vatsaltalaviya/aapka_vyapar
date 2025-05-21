const BusinessDetails = require('../models/BusinessDetails');

module.exports.basicDetails = async (req, res) => {
    const {
        businessName,
        GstNo,
        businessPhoneNumber1,
        businessPhoneNumber2,
        businessAddress,
        businessEmail,
        businessPincode,
        businessDescription,
        signature
    } = req.body;
    const userId = req.user._id;
    

    const businessDetails = {
        businessName,
        GstNo,
        businessPhoneNumber1,
        businessPhoneNumber2,
        businessAddress,
        businessEmail,
        businessPincode,
        businessDescription,
        signature,
        userId
    };

    const existingBusiness = await BusinessDetails.findOne({ $or: [
                { GstNo },
                { businessEmail }
            ],
            userId});
    if(existingBusiness){
        return res.status(400).json({
            message: "Business details already exist",
            existingBusiness
        });
    }
    const Business = await BusinessDetails.create(businessDetails);

    res.status(201).json({
        message: "Business details added successfully",
        Business
    });

}

module.exports.updateBusinessDetails = async (req, res) => {
    const { id } = req.params;
    const {
        businessName,
        GstNo,
        businessPhoneNumber1,
        businessPhoneNumber2,
        businessAddress,
        businessEmail,
        businessPincode,
        businessDescription,
        signature
    } = req.body;



    const updatedBusinessDetails = {
        businessName,
        GstNo,
        businessPhoneNumber1,
        businessPhoneNumber2,
        businessAddress,
        businessEmail,
        businessPincode,
        businessDescription,
        signature
    };

    const updatedBusiness = await BusinessDetails.findByIdAndUpdate({ _id: id, userId: req.user._id }, updatedBusinessDetails, { new: true });

    if (!updatedBusiness) {
        return res.status(404).json({ message: "Business details not found" });
    }

    res.status(200).json({
        message: "Business details updated successfully",
        updatedBusiness
    });
}
/*
module.exports.getBusinessDetails = async (req, res) => {
    const userId = req.user._id;

    try {
        const businessDetails = await BusinessDetails.find({ userId });
        res.status(200).json({ message: "Business fetched successfully", data: businessDetails });
        if (!businessDetails) {
            return res.status(404).json({ message: "Business details not found" });
        }   
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports.deleteBusinessDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBusiness = await BusinessDetails.findByIdAndDelete({ _id: id, userId: req.user._id });
        if (!deletedBusiness) {
            return res.status(404).json({ message: "Business details not found" });
        }

        res.status(200).json({
            message: "Business details deleted successfully",
            deletedBusiness
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
    */