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

// router.get("/:id", async (req, res, next) =>{

//     try{

//         const result = await SongController.getById(req.params.id);

//         if(result.error){
//             throw {message: result.message, status: result.statusCode};
//         }

//         res.json(result);
        
//     }catch(err){
//         res.status(err.status).json({error: err.message});
//     } 
// });

router.post("/", async (req, res, next) =>{

    try{

        const result = await SongController.save(req.body);

        if(result.error){
            throw {message: result.message, status: result.statusCode};
        }

        res.status(201).json(result);
        
    }catch(err){
        console.log(err + " Erro aqui");
        res.status(err.status).json({error: err.message});
    }
});

module.exports = router;