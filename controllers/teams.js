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

router.get('/new', async (req, res) => {
    const players = await Player.find({});
    const pitchers = await Pitcher.find({});
    res.render('teams/new.ejs', {
        players,
        pitchers,
    })
})

router.get('/:teamId', async (req, res) => {
    try {
        const populatedTeam = await Team.findById(req.params.teamId).populate('owner').populate('players').populate('pitchers');
        const positions = ['first-base', 'second-base', 'third-base', 'short stop', 'catcher', 'out-field'];
        const outfielders = populatedTeam.players.filter(player => player.position === 'out-field' && player.starting);
        const otherPositions = positions.filter(pos => pos !== 'out-field');
        const starters = {};
        const benchPlayers = [];
        const startingPitchers = [];
        const benchPitchers = [];

        otherPositions.forEach(position => {
            const player = populatedTeam.players.find(player => player.position === position && player.starting);
            if(player) {
                starters[position] = player;
            }
        });

        populatedTeam.players.forEach(player => {
            if (!player.starting) {
                benchPlayers.push(player);
            }
        });

        populatedTeam.pitchers.forEach(pitcher => {
            if (pitcher.starting) {
                startingPitchers.push(pitcher)
            } else {
                benchPitchers.push(pitcher)
            }
        })

        res.locals.team = populatedTeam
        res.render('teams/show.ejs', {
            team: populatedTeam,
            starters,
            outfielders,
            benchPlayers,
            startingPitchers,
            benchPitchers,
            user: req.session.user,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:teamId/edit', async (req, res) => {
    try {
        const players = await Player.find({});
        const pitchers = await Pitcher.find({});
        const currentTeam = await Team.findById(req.params.teamId);
        res.render('teams/edit.ejs', {
            team: currentTeam,
            players,
            pitchers,
        })
    } catch (error) {
        console.log('error');
        res.redirect('/');
    }
})

router.put('/:teamId', async (req, res) => {
    try {
        const players = await Player.find({});
        const pitchers = await Pitcher.find({});
        const currentTeam = await Team.findById(req.params.teamId);
        await currentTeam.updateOne(req.body);
        res.redirect('/teams')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.post('/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        newTeam.owner = req.session.user._id;
        await newTeam.save();
        res.redirect('/teams');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.delete('/:teamId', async (req, res) => {
    try {
        const usedTeam = await Team.findById(req.params.teamId);
        await usedTeam.deleteOne();
        res.redirect('/teams')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})




module.exports = router;