const Club = require("../model/clubSchema");

exports.createClub = async (req, res, next) => {
    try {
        const { name, location, desc, discord } = req.body;

        const newClub = new Club();

        newClub.name = name;
        newClub.location = {
            city: location.city[0].toUpperCase() + location.city.slice(1),
            province:
                location.province[0].toUpperCase() + location.province.slice(1),
            country:
                location.country[0].toUpperCase() + location.country.slice(1),
            online: location.online,
        };
        newClub.desc = desc;
        newClub.founder = req.user._id;

        if (!discord.match(/^https:\/\/discord.gg\/[a-zA-Z0-9]{8,10}$/)) {
            return res.send({ message: "Invalid Discord invite" }).status(400);
        }

        newClub.discord = discord;

        newClub.save();

        if (newClub) {
            res.send(newClub);
        }
    } catch (error) {}
};

exports.getClubById = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id).populate([
            {
                path: "founder",
                select: "-password -v",
            },
            {
                path: "members",
                select: "-password -v",
            },
        ]);

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
        let clubs;
        let count;
        const page = req.query.page || 1;
        const pageSize = 1;

        if (req.query.search) {
            count = await Club.countDocuments({
                $text: {
                    $search: req.query.search,
                },
            });

            clubs = await Club.find({
                $text: {
                    $search: req.query.search,
                },
            })
                .populate("members", "-password")
                .skip(pageSize * page - 1)
                .limit(pageSize);
        } else {
            count = await Club.countDocuments();
            clubs = await Club.find()
                .populate("members", "-password")
                .skip(pageSize * page - 1)
                .limit(pageSize);
        }

        if (!clubs) {
            return res.status(404).send({ message: "Club not found" });
        }
        res.send({ count, clubs });
    } catch (error) {
        next(error);
    }
};

exports.joinClub = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id);

        club.members.push(req.user._id);
        await club.save();
        res.send({ message: `Successfully joined ${club.name}` });
    } catch (error) {
        next(error);
    }
};
