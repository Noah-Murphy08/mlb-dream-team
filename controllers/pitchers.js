const express = require('express');
const router = express.Router();

const Team = require('../models/team');
const Player = require('../models/player');
const Pitcher = require('../models/pitcher');


router.get('/', async (req, res) => {
    try {
        res.locals.populatedPitchers = await Pitcher.find({}).populate('owner');
        if (req.session.user) {
            res.locals.userPitchers = await Pitcher.find({ owner: req.session.user._id }).populate('owner');
        } else {
            res.locals.userPitchers = [];
        }
        res.render('pitchers/index.ejs')
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;