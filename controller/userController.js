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
