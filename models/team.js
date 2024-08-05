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
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    pitchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pitcher',
    }]
})


const Team = mongoose.model('Team', teamSchema);

module.exports = Team