var mongoose = require("./db");

var pfpy = mongoose.Schema({
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
    salary: {
        type: String,
        required: true
    },

    ratio: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    dosage: {
        type: String,

    }
});

module.exports = mongoose.model("pf", pfpy);