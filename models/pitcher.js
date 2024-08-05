const mongoose = require('mongoose')



const pitcherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    throws: {
        type: String,
        required: true
    },
    pitches: [{
        type: String,
        required: true,
    }],
    starting: {
        type: Boolean,
    }
})

const Pitcher = mongoose.model('Pitcher', pitcherSchema)

module.exports = Pitcher