const Club = require("../model/clubSchema");

exports.createClub = async (req, res, next) => {
    try {
        const { name, location, desc } = req.body;

        const newClub = new Club();

        newClub.name = name;
        newClub.location = location;
        newClub.desc = desc;
        newClub.founder = req.user._id;

        newClub.save();

        if (newClub) {
            res.send(newClub);
        }
    } catch (error) {}
};

exports.getClubById = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id).populate("members");
        if (!club) {
            return res.status(404).send({ message: "Club not found" });
        }

        res.send(club);
    } catch (error) {
        next(error);
    }
};

exports.getAllClubs = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id).populate("members");
        if (!club) {
            return res.status(404).send({ message: "Club not found" });
        }
        res.send(clubs);
    } catch (error) {
        next(error);
    }
};

exports.joinClub = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id);

        club.members.push(req.user._id)
        await club.save()
        res.send({message: "Successfully joined club"})
    } catch (error) {
        next(error);
    }
};

