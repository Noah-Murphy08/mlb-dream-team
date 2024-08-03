const mongoose = require('mongoose')



const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    batSide: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    }
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player