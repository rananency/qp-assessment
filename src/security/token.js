const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ error: 'Token is invalid.' });
        }
        next();
    });
};

module.exports = authorize;
