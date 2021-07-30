const User = require("../model/userSchema");
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select("-password");
            next();
        }

        if (!token) {
            res.status(401).send({ message: "No JWT" });
        }
    } catch (error) {
        next(error);
    }
};
