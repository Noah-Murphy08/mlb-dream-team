const mongoose = require('mongoose')


const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    stadium: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    pitcher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pitcher',
    }
})


const Team = mongoose.model('Team', teamSchema);

module.exports = Team