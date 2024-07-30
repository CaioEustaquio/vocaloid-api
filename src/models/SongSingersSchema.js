const mongoose = require("mongoose");

const SongSingersSchema = mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  singer_id: {type: mongoose.Schema.Types.ObjectId, ref:"singers"},
  song_id: {type: mongoose.Schema.Types.ObjectId, ref:"songs"}
}, {versionKey: false});

const songSingers = mongoose.model("song_singers", SongSingersSchema);

module.exports = songSingers;