"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const mongoose = require('mongoose');
const player = require('./Schema/PlayerSchema.js');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/leaderboard/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.connect(process.env.MONGOURI);
    player.find({}, function (err, users) {
        let userMap = [];
        console.log(userMap);
        users.forEach(function (user) {
            console.log(user);
            userMap.push(user);
        });
        res.send(userMap);
    });
}));
app.post('/leaderboard/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.connect(process.env.MONGOURI);
    let entryData = req.body.leaderboardData;
    let newScoreEntry = yield player.create({
        username: entryData.username,
        score: entryData.score
    });
    yield newScoreEntry.save();
}));
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
