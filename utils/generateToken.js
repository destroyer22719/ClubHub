const jtw = require("jsonwebtoken");

const generateToken = (_id) => {
    return jtw.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

module.exports = generateToken