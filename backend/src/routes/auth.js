const express = require('express');


//middlewares
const {authCheck} = require('../utils/middleware/auth'); 

const myMiddleware = (req,res,next) => {
    console.log('Im a Middleware yay')
    next();
}

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);
  
    router.post('/create-or-update-user',authCheck, (req,res) => {
        res.json({
            data : "API nodejs"
        })
    });

    router.get('/test',myMiddleware, (req,res) => {
        res.json({
            data : "API nodejs"
        })
    })
  }
  
  module.exports = authApi;


