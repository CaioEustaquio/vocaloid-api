const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema({
    id: Number,
    artistic_name: String,
    name: String,
    birth_date: Date
});

module.exports = ProducerSchema;