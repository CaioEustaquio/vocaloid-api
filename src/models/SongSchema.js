const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    id: Number,
    name: String,
    en_name: String,
    producer: String,
    release_date: Date,
    singer: Date
});

module.exports = SongSchema;