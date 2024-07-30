const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: [true, "Song name is invalid"]},
    en_name: String,
    release_date: {type: Date, required: [true, "Release date is invalid"]},
    producer_id: {type: mongoose.Schema.Types.ObjectId, ref: "producers", required: [true, "Producer is invalid"]},
}, {versionKey: false});

const song = mongoose.model("songs", SongSchema);

module.exports = song;