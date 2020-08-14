const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var path = require('path');

const User = require('../models/User');

const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
    appId: keys.pusherAppId,
    key: keys.pusherKey,
    secret: keys.pusherSecret,
    cluster: keys.pusherCluster,
    useTLS: keys.pusherEncrypted
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.post('/register', async (req, res) => {
    const newUser = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };

    await new User(newUser).save();
    res.redirect("/user/login");
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', async (req, res) => {
    var foundedUser = await User.findOne({ email: req.body.email });
    if (foundedUser) {
        // Bulunan kullanıcının şifresi ile, form'dan gelen şifrenin eşleşmesini kontrol ediyor
        if (foundedUser.password == req.body.password) {
            res.redirect("/vote");
        } else {
            console.log("Sifre yanlis")
        }
     } else {
        console.log("User bulunamadi")
    }
});

module.exports = router;