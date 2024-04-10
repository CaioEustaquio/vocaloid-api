const mongoose = require("mongoose");
const ProducerSchema = require("./../models/ProducerSchema");

const ProducerController = {

  async getAll(){

    try{

      const ProducerModel = mongoose.model("producers", ProducerSchema);

      const results = await ProducerModel.find({}).lean();

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

module.exports = ProducerController;