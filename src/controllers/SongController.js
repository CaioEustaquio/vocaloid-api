const mongoose = require("mongoose");
const SongSchema = require("./../models/SongSchema");
const SingersSchema = require("./../models/SingersSchema");
const SongSingersSchema = require("./../models/SongSingersSchema");

class SongController{

  static async getAll(req, res, next){

    try{

      const results = await SongSchema.find({}).lean();

      const treatedResults = results.map(({_id, producer_id, ...rest}) => ({
        ...rest
      }));

      res.status(200).json(treatedResults);

    }catch(err){
      next(err);
    }
  }

  static async getById(req, res, next){

    try{

      const foundedSong = await SongSchema.findById(req.params.id);

      if(foundedSong == null){
        throw new Error("Song do not exists");
      }

      res.status(200).json(foundedSong);

    }catch(err){
      next(err);
    }
  }
  
  static async save(req, res, next){

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

      let {
        name,
        en_name,
        producer,
        release_date,
        singers
      } = req.body;

      if(!name || name === ""){

        throw new Error("The song name cannot be empty");

      }else if(!producer || producer === ""){
        
        throw new Error("The producer name cannot be empty");
        
      }else if(!release_date || release_date === ""){
        
        throw new Error("The release date cannot be empty");
        
      }else if(singers.length <= 0){
        throw new Error("The singers are invalid");
      }

      const song = {
        name: name.toUpperCase(),
        en_name: en_name ? en_name.toUpperCase() : null,
        release_date: release_date,
        producer_id: producer
      }

      const songExists = await SongSchema.find({
        $or: [
          {name: song.name},
          {en_name: song.en_name}
        ]
      }).lean();

      if(songExists.length > 0){
        throw new Error("The song already exists");
      }

      const query = await SongSchema.create([song], {session});

      const createdSong = query[0];

      const singerIds = singers.split(",");

      await Promise.all(singerIds.map(async (s) => {
        let singerExists = await SingersSchema.findById(s).session(session);
  
        if (!singerExists){
          throw new Error("The singer(s) are invalid");
        }

        const songSinger = {
          singer_id: s,
          song_id: createdSong._id
        };

        await SongSingersSchema.create([songSinger], {session});
      }));

      await session.commitTransaction();
      session.endSession();

      const {_id, producer_id, ...treatedResults} = createdSong.toObject();

      res.status(201).json(treatedResults);
      
    }catch(err){
      await session.abortTransaction();
      session.endSession();
      next(err);
    }
  }
}

module.exports = SongController;