const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token!" });
    }
};

module.exports = verifyToken;
