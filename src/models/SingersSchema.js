const mongoose = require("mongoose");

const SingersSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId},
  vocaloid_id: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String}
}, {versionKey: false});

const singer = mongoose.model("singers", SingersSchema);

module.exports = singer;