const express = require('express');


//middlewares
const {authCheck} = require('../utils/middleware/auth'); 


function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);
  
    router.post('/create-or-update-user',authCheck, (req,res) => {
        res.json({
            data : "API nodejs"
        })
    });

 
  }
  
  module.exports = authApi;


