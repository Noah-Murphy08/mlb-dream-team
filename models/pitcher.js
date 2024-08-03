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
    pitchType: {
        type: String,
        required: true
    }
})

const Pitcher = mongoose.model('Pitcher', pitcherSchema)

module.exports = Pitcher