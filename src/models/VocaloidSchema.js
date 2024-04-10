const mongoose = require("mongoose");

const VocaloidSchema = new mongoose.Schema({
    id: Number,
    name: String,
    release_data: Date,
    gender: String,
    voice: String,
    height: Number,
    weight: Number,
    voice_banks: Array
});

module.exports = VocaloidSchema;