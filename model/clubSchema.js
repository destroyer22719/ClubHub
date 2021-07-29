const mongoose = require("mongoose")


const clubSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User