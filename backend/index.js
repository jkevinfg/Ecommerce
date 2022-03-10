const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('./src/config/index');

const authApi = require('./src/routes/auth');
const userApi = require('./src/routes/user')
//app 
const app = express();

//db
const MongoLib = require('./src/lib/mongo')
const mongo = new MongoLib()
mongo.connection()

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({
    limit : '2mb'
}));
app.use(cors());

// routes
authApi(app);
userApi(app);

//port
app.listen(config.port , () => {
    console.log("server on port", config.port)
});





