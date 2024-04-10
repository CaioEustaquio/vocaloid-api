const mongoose = require('mongoose');
const config = require('./../config');

async function main(){

    try{

        return await mongoose.connect(config.dbConnectionString);

    }catch(err){
        throw new Error(err.codeName);
    }
};

module.exports = main;