const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const admin = jwt.verify(token, process.env.JWT_SECRET);
        if (!admin) return res.status(401).send('Invalid Token');
        req.admin = admin;
        next();

    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
}

module.exports = adminAuth