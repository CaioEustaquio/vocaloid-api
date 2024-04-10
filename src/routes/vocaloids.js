const express = require("express");
const router = express.Router();
const VocaloidController = require("./../controllers/VocaloidController");

router.get("/", async (req, res, next) =>{

    try{

        const result = await VocaloidController.getAll();

        if(result.error){
            throw {message: result.message, status: result.statusCode};
        }

        res.json(result);
        
    }catch(err){
        res.status(err.status).json({error: err.message});
    } 
});

module.exports = router;