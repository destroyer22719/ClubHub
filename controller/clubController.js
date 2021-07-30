const Club = require("../model/clubSchema");


exports.createClub = async (req, res, next) => {
    try {
        const { name, location, desc} = req.body

        const newClub = new Club()

        newClub.name = name;
        newClub.location = location;
        newClub.desc = desc;
        newClub.founder = req.user._id;

        newClub.save()

        if (newClub) {
            res.send(newClub)
        }

    } catch (error) {

    }
}

exports.getClubById = async (req, res, next) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            res.status(404).send({message: "Club not found"})
        }

        res.send(club)

    } catch (error) {
        next(error)
    }
}