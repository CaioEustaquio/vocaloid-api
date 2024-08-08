const mongoose = require("mongoose");
const ProducerSchema = require("./../models/ProducerSchema");

class ProducerController{

  static async getAll(req, res, next){

    try{

      const ProducerModel = mongoose.model("producers", ProducerSchema);

      const results = await ProducerModel.find({}).lean();

      const treatedResults = results.map(({_id, ...rest}) => ({
        ...rest
      }));

      res.status(200).json(treatedResults);

    }catch(err){
      next(err);
    }
  }

}

module.exports = ProducerController;