const jwt = require('jsonwebtoken')
const User = require('../model/userBase')

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) res.status(401).json({ error: "Access Denied" })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded._id).select("-password");
        next();
    } catch (error) {
        res.staus(401).json({ error: "Invalid token" });
    }
}



module.exports = authMiddleware