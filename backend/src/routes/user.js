const express = require('express');


function userApi(app) {
    const router = express.Router();
    app.use('/api/user', router);
  
    router.get('/',(req,res) => {
        res.json({
            data : "API user nodejs"
        })
    });
  }
  
  module.exports = userApi;
