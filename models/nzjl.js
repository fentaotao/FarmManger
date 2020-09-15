var mongoose = require("./db");

var nzjl = mongoose.Schema({
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
    land_num: {
        type: String,
        required: true
    },

    labor_cost: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    m_amount: {
        type: String,

    },
    seed: {
        type: String,

    },
    s_amount: {
        type: String,

    },

});

module.exports = mongoose.model("nz", nzjl);