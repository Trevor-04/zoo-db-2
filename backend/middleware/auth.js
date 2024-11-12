const jwt = require('jsonwebtoken');

module.exports.generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

// auth.js
module.exports.verifyEmployeeRole = (req, res, next) => {
    const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'employee') {
            return res.status(403).json({ message: "Forbidden: Requires employee role" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
