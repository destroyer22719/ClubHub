const mongoose = require("mongoose")


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio:{
            type: String,
            required: true,
        },
        clubs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Club"
        }],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User