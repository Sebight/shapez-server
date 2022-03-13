require('dotenv').config()

const mongoose = require('mongoose');

const player = require('./Schema/PlayerSchema.js');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

type Player = {
    _id: any,
    name: string,
    score: Number,
    __v: any
}

app.get('/leaderboard/all', async (req: any, res: any) => {
    player.find({}, (err: any, users: Player[]) => {
        let userMap : Player[] = [];
        console.log(userMap);

        users.forEach(function (user: Player) {
            console.log(user);
            userMap.push(user);
        });

        res.send(userMap);
    });
});

app.post('/leaderboard/new', async (req: any, res: any) => {
    let entryData = req.body.leaderboardData;
    
    let newScoreEntry = await player.create({
        username: entryData.username,
        score: entryData.score
    })
    
    await newScoreEntry.save();
});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGOURI);
    console.log(`Listening on port ${process.env.PORT}`);
});