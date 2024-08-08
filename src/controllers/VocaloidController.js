const mongoose = require("mongoose");
const VocaloidSchema = require("./../models/VocaloidSchema");

class VocaloidController{

  static async getAll(req, res, next){

    try{

      const VocaloidModel = mongoose.model("vocaloids", VocaloidSchema);

      const results = await VocaloidModel.find({}).lean();

      const treatedResults = results.map(({_id, ...rest}) => ({
        ...rest
      }));

      res.status(200).json(treatedResults);

    }catch(err){
      next(err)
    }
  }

}

module.exports = VocaloidController;