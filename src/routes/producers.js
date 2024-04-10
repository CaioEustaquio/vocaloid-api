const express = require("express");
const router = express.Router();
const ProducerController = require("./../controllers/ProducerController");

router.get("/", async (req, res) =>{
    
    try{

        const result = await ProducerController.getAll();

        if(result.error){
            throw {message: result.message, status: result.statusCode};
        }

        res.json(result);
        
    }catch(err){
        res.status(err.status).json({error: err.message});
    } 
});

module.exports = router;