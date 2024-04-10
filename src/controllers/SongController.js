const mongoose = require("mongoose");
const SongSchema = require("./../models/SongSchema");

const SongController = {

  async getAll(){

    try{

      const SongProducer = mongoose.model("songs", SongSchema);

      const results = await SongProducer.find({}).lean();

      const treatedResults = results.map(({_id, ...rest}) => ({
        id: _id,
        ...rest
      }));

      return treatedResults;

    }catch(err){
      console.log(err);
      return {error: true, message: err.message, statusCode: 420};
    }
  }

}

module.exports = SongController;