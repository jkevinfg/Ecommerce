const express = require('express');


function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);
  
    router.get('/create-or-update-user',(req,res) => {
        res.json({
            data : "API nodejs"
        })
    });
  }
  
  module.exports = authApi;


