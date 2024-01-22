const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const { JWT_SECRET } = require("../lib");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        const { username } = jwt.verify(token, JWT_SECRET);
        if (username) {
            const admin = await Admin.findOne({ username });
            if(!admin) {
                return res.status(401).send('Unathorized');
            }
            req.user = admin
            next();
        } else {
            return res.status(401).send('Unathorized');
        }
    } catch (e) {
        res.status(401).json({
            msg: "Incorrect inputs"
        })
    }
}

module.exports = adminMiddleware;