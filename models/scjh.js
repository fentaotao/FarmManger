var mongoose = require("./db");

var scjh = mongoose.Schema({
    sid: {
        type: String,
    },
    time: {
        type: String,

    },
    name: {
        type: String,
        required: true
    },
    seed_date: {
        type: String,
        required: true
    },

    seed_place: {
        type: String,
        required: true
    },
    launch_date: {
        type: String,
        required: true
    },
    delist_date: {
        type: String,

    },
    pre_gain: {
        type: String,

    },
    pre_hdate: {
        type: String,

    },
    pre_hgain: {
        type: String,

    }
});

module.exports = mongoose.model("sc", scjh);