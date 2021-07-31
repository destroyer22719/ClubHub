const User = require("../model/userSchema");
const Club = require("../model/clubSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password, bio } = req.body;
        const userDupe = await User.findOne({ email });

        if (userDupe) {
            res.status(409).send({ message: "Email is already taken" });
        }

        const user = new User();
        (user.name = name),
            (user.email = email),
            (user.password = await bcrypt.hashSync(password, 10));
        user.bio = bio;

        await user.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                bio: user.bio,
            });
        } else {
            res.status(406).send({ message: "Invalid Input" });
        }
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
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
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }
        const clubs = await Club.find({ members: req.user._id}).populate("members")

        res.send({...user._doc, clubs});
    } catch (error) {
        next(error);
    }
};
