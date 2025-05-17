const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjgxOTNiNGEwZjdmMzM5YTM5ODViZCIsImlhdCI6MTc0NzQ1ODM2MywiZXhwIjoxNzQ3NTQ0NzYzfQ.1uiXsisYqLno7M8RJLN4eWdaNaE3Ds-p4Lwl_01G3Gg

module.exports.authUser = async (req, res, next) => {
    // Get token from headers
    const authHeader = req.headers.authorization;

    // Validate presence and format of Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];

    try {  
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user info from database (optional, but good for role-based auth)
        const user = await UserModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
