export {};

let mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: String,
    score: Number
});

module.exports = mongoose.model('Player', playerSchema);