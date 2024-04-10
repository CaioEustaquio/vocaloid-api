const express = require("express");
const router = express.Router();
const SongController = require("./../controllers/SongController");

router.get("/", async (req, res, next) =>{

    try{

        const result = await SongController.getAll();

        if(result.error){
            throw {message: result.message, status: result.statusCode};
        }

        res.json(result);
        
    }catch(err){
        res.status(err.status).json({error: err.message});
    } 
});

module.exports = router;