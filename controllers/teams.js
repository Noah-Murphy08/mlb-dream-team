const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Team = require('../models/team');
const Player = require('../models/player');
const Pitcher = require('../models/pitcher');

module.exports = router;