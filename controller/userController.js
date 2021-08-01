const User = require("../model/userSchema");
const Club = require("../model/clubSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password, bio } = req.body;
        const userDupe = await User.findOne({ email });

        if (userDupe) {
            return res.status(409).send({ message: "Email is already taken" });
        }

        const user = new User();
        (user.username = username),
            (user.email = email),
            (user.password = await bcrypt.hashSync(password, 10));
        user.bio = bio;

        await user.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
                bio: user.bio,
            });
        } else {
            return res.status(406).send({ message: "Invalid Input" });
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
            return res.status(404).send({ message: "Incorrect email" });
        }

        if (user && (await bcrypt.compareSync(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).send({ message: "Incorrect password" });
        }
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id).select("-password");
        const clubs = await Club.find({ members: req.params.id}).populate("members").select("-password")

        if (user) {
            res.send({...user._doc, clubs});
        } else {
            res.send({message: "User not found"}).status(404);
        }
    } catch (error) {
        next(error);
    }
}

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

exports.deleteUser = async(req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        if (user) {
            await user.remove();
            return res.send({ message: "User removed"});
        } else {
            return res.send({ message: "User not found"}).status(404);
        }
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user) {
            res.send({message: "User not found"}).status(404);
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;
        user.password = await bcrypt.hashSync(req.body.password, 10) || user.password

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio
        });
    } catch (error) {
        next(error);
    }
};
