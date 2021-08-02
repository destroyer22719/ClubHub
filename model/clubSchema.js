const mongoose = require("mongoose");

const ClubSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        founder: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        discord: {
            type: String,
            required: true,
        },
        location: {
            city: {
                type: String,
                required: true,
            },
            province: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            online: {
                type: Boolean,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

ClubSchema.index({"name": "text", "desc": "text"} );
const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
