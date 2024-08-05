const express = require('express');
const router = express.Router();

const Team = require('../models/team');
const Player = require('../models/player');
const Pitcher = require('../models/pitcher');


router.get('/', async (req, res) => {
    try {
        res.locals.populatedPitchers = await Pitcher.find({}).populate();
        if (req.session.user) {
            res.locals.userPitchers = await Pitcher.find({ owner: req.session.user._id }).populate();
        } else {
            res.locals.userPitchers = [];
        }
        res.render('pitchers/index.ejs')
    } catch (error) {
        console.log(error);
    }
})

router.get('/new', async (req, res) => {
    try {
        res.render('pitchers/new.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

router.get('/:pitcherId', async (req, res) => {
    try {
        const populatedPitchers = await Pitcher.findById(req.params.pitcherId).populate();
        res.locals.pitcher = populatedPitchers;
        res.render('pitchers/show.ejs', {
            pitcher: populatedPitchers,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        if (req.body.starting === 'on') {
            req.body.starting = true;
        } else {
            req.body.starting = false;
        }
        const newPitcher = new Pitcher(req.body)
        newPitcher.owner = req.session.user._id
        await newPitcher.save()
        res.redirect('/pitchers')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})




module.exports = router;