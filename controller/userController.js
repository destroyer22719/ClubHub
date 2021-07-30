const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userDupe = await User.findOne({ email });

        if (userDupe) {
            res.status(409).send({ message: "Email is already taken" });
        }

        const user = new User();
        (user.name = name),
            (user.email = email),
            (user.password = await bcrypt.hashSync(password, 10));

        await user.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(406).send({ message: "Invalid Input" });
        }
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        if (user && (await bcrypt.compareSync(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).send({ message: "Incorrect password" });
        }
        
    } catch (error) {
        next(error);
    }
}