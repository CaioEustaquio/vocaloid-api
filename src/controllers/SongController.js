const mongoose = require("mongoose");
const SongSchema = require("./../models/SongSchema");
const SingersSchema = require("./../models/SingersSchema");
const SongSingersSchema = require("./../models/SongSingersSchema");

const SongController = {

  async getAll(){

    try{

      const results = await SongSchema.find({}).lean();

      const treatedResults = results.map(({_id, producer_id, ...rest}) => ({
        ...rest
      }));

      return treatedResults;

    }catch(err){
      return {error: true, message: err.message, statusCode: 500};
    }
  },

  // async getById(songId){

  //   try{

  //     const results = await SongSchema.findById(songId);

  //     return results;

  //   }catch(err){
  //     return {error: true, message: err.message, statusCode: 500};
  //   }
  // },
  
  async save(data){

    // const session = await mongoose.startSession();
    
    try{

      let {
        name,
        en_name,
        producer,
        release_date,
        singers
      } = data;

      if(!name || name === ""){

        throw {message: "The song name cannot be empty", status: 420};

      }else if(!producer || producer === ""){
        
        throw {message: "The producer name cannot be empty", status: 420};

      }else if(!release_date || release_date === ""){

        throw {message: "The release date cannot be empty", status: 420};

      }else if(singers.length <= 0){
        throw {message: "The singers are invalid", status: 420};
      }

      const song = {
        name: name.toUpperCase(),
        en_name: en_name ? en_name.toUpperCase() : null,
        release_date: release_date,
        producer_id: producer
      }

      // session.startTransaction();

      const songExists = await SongSchema.find({
        $or: [
          {name: song.name},
          {en_name: song.en_name}
        ]
      }).lean();

      if(songExists.length > 0){
        throw {message: "The song already exists", status: 420};
      }

      const createdSong = await SongSchema.create(song);

      const singerIds = singers.split(",");

      await Promise.all(singerIds.map(async (s) => {
        let singerExists = await SingersSchema.findById(s);
  
        if (!singerExists){
          throw { message: `The singer(s) are invalid`, status: 420 };
        }
  
        const songSinger = {
          singer_id: s,
          song_id: createdSong._id
        };
  
        await SongSingersSchema.create(songSinger);
      }));

      // await session.commitTransaction();
      // session.endSession();

      const {_id, producer_id, ...treatedResults} = createdSong.toObject();
      return treatedResults;
      
    }catch(err){
      console.log(err);
      // await session.abortTransaction();
      // session.endSession();
      return {error: true, message: err.message, statusCode: err.status};
    }
  }
}

module.exports = SongController;