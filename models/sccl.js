var mongoose = require("./db");

var sccl = mongoose.Schema({
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
    number: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("sccls", sccl);