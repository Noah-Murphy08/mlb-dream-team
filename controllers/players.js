const express = require('express');
const router = express.Router();

const Team = require('../models/team');
const Player = require('../models/player');
const Pitcher = require('../models/pitcher');


router.get('/', async (req, res) => {
    try {
        res.locals.populatedPlayers = await Player.find({}).populate();
        if (req.session.user) {
            res.locals.userPlayers = await Player.find({ owner: req.session.user._id }).populate();
        } else {
            res.locals.userPlayers = [];
        }
        res.render('players/index.ejs')
    } catch (error) {
        console.log(error);
    }
})

router.get('/new', async (req, res) => {
    try {
        res.render('players/new.ejs')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:playerId', async (req, res) => {
    try {
        const populatedPlayers = await Player.findById(req.params.playerId).populate()
        res.locals.player = populatedPlayers
        res.render('players/show.ejs', {
            player: populatedPlayers,
        })
    } catch (error) {
        console.log(error);
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
        const newPlayer = new Player(req.body)
        newPlayer.owner = req.session.user._id
        await newPlayer.save()
        res.redirect('/players')
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})




module.exports = router;