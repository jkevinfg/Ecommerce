const {Connection , Mongoose } = require('mongoose');
const { config } = require('../config');

const MONGO_URI = config.database;

class MongoLib {
    constructor() {
        this.client = new Connection(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
         });
       // this.dbName = DB_NAME;
    }

    connection() {
        if (!MongoLib.connect) {
            MongoLib.connect = new Promise((resolve, reject) => {
                this.client.connection(err => {
                    if (err) {
                        reject(err);
                    }
                    console.log('Connected succesfully to mongo');
                });
            });
        }

        return MongoLib.connect;
    }

}

module.exports = MongoLib;

