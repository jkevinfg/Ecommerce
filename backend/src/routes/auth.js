const express = require('express');
const User = require('../utils/schemas/user');

//middlewares
const {authCheck} = require('../utils/middleware/auth'); 

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);
  
    //POST
    router.post('/create-or-update-user',authCheck, async (req,res) => {
        const {email,aud} = req.user;
        console.log(req.user)
        const user = await User.findOneAndUpdate({email}, {name:aud},{new : true});
        if(user){
            console.log('User updated',user)
            res.json(user);
        }else {
            const newUser = await new User({
                email,
                name: aud, 
            }).save();
            console.log('User created',newUser)
            res.json(newUser);
        }
    });
  }
  
  module.exports = authApi;


