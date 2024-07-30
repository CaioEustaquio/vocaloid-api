const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: [true, "Producer name is invalid"]}
}, {versionKey: false});

module.exports = ProducerSchema;