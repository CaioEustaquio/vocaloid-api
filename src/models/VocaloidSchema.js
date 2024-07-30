const mongoose = require("mongoose");

const VocaloidSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String},
    release_data: {type: Date},
    gender: {type: String},
    voice: {type: String},
    voice_banks: {type:Array}
}, {versionKey: false});

module.exports = VocaloidSchema;