const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../lib");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        const { username } = jwt.verify(token, JWT_SECRET);
        if (username) {
            const user = await User.findOne({ username });
            if(!user) {
                return res.status(401).send('Unathorized');
            }
            req.user = user
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

module.exports = userMiddleware;