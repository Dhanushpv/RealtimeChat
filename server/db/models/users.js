
const mongoose = require('mongoose');

const users = new mongoose.Schema({
    name: {
        type: String,
        // required: true,

    },
    email: {
        type: String,
        // required: true,
    },
    phone_no: {
        type: String,
        // required: true, // If necessary
    },
    password: {
        type: String,
        // required: true,
    },
    usertypes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usertypes",
    },

});

module.exports = mongoose.model("users", users);