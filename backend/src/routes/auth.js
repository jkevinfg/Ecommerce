const express = require('express');
const User = require('../utils/schemas/user');
//middlewares
const authCheck = require('../utils/middleware/auth'); 

function authApi(app) {
    const router = express.Router();
    app.use('/auth', router);

    router.post('/create-or-update',authCheck, async function (req,res,next) {
        const {email} = req.user;
        const user = await User.findOneAndUpdate({email}, {name: email.split("@")[0]},{new : true});
        if(user){
            console.log("User updated",user);
            res.json(user);
        }else {
            const newUser = await new User({    
                email,
                name: email.split("@")[0], 
            }).save();
           console.log("User created",newUser);
            res.json(newUser);
        }
    }); 
  }
  
  module.exports = authApi;


