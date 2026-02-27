const jwt = require('jsonwebtoken');

// 1. Verify if the user is Logged In
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    // Token check karein
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        // Token format: "Bearer <token>", isliye split karna hoga
        const bearerToken = token.split(' ')[1];
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        
        // Request object mein user data attach karein
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// 2. Verify if the user is an Admin
const isAdmin = (req, res, next) => {
    // req.user humein verifyToken middleware se milega
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { verifyToken, isAdmin };