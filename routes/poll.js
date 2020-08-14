const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    useTLS: keys.pusherEncrypted
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success: true, votes: votes }));
});

router.post('/', (req, res) => {
    const newVote = {
        live: req.body.live,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('live-poll', 'live-vote', {
            points: parseInt(vote.points),
            live: vote.live
        });

        return res.json({ success: true, vote: vote });
    });
});

module.exports = router;