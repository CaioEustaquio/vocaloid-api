const mongoose = require("mongoose");
const VocaloidSchema = require("./../models/VocaloidSchema");

const VocaloidController = {

  async getAll(){

    try{

      const VocaloidModel = mongoose.model("vocaloids", VocaloidSchema);

      const results = await VocaloidModel.find({}).lean();

      const treatedResults = results.map(({_id, ...rest}) => ({
        ...rest
      }));

      return treatedResults;

    }catch(err){
      console.log(err);
      return {error: true, message: err.message, statusCode: 420};
    }
  }

}

module.exports = VocaloidController;