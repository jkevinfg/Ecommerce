const mongoose = require('mongoose');
const { config } = require('../config/index');
const MONGO_URI = config.database

class MongoLib{
    constructor(){
        this.client =  mongoose.connect(MONGO_URI, {
            useNewUrlParser:true,
        })
    }
    connection() {
       this.client.then(() => console.log('DB connection'))
        .catch(err => console.log('DB connection err',err));
    }
}

module.exports = MongoLib;