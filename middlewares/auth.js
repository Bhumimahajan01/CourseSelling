const jwt = require('jsonwebtoken');
require('dotenv').config();
const  JWT_SECRET = process.env.JWT_SECRET;
function userMiddleware(req, res, next) {
    try {
        console.log("Middleware invoked");
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                msg: "Please sign in first"
            });
        }
        const decoded_info = jwt.verify(token, JWT_SECRET);
        req.userId = decoded_info.userId;
        next();
        
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token, please sign in again",
            error: err.message
        });
    }
}

module.exports = {
    userMiddleware: userMiddleware
}