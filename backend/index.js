const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { config } = require('./src/config/index');

const authApi = require('./src/routes/auth');
const userApi = require('./src/routes/user')
//app 
const app = express();

//db
mongoose.connect(config.database , {
    useNewUrlParser:true,
}).then(() => console.log('DB connection'))
.catch(err => console.log('DB connection err',err));

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





