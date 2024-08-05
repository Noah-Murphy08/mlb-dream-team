const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Team = require('../models/team');
const Player = require('../models/player');
const Pitcher = require('../models/pitcher');


router.get('/', async (req, res) => {
    try {
        res.locals.populatedTeams = await Team.find({}).populate('owner');
        if (req.session.user) {
            res.locals.userTeams = await Team.find({ owner: req.session.user._id }).populate('owner');
        } else {
            res.locals.userTeams = [];
        }
        res.render('teams/index.ejs')
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;