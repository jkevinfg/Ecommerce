const admin = require('../firebase');

exports.authCheck = async (req,res,next) => {
   // console.log(req.headers); //token
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
      //  console.log("Firebase user in authcheck",firebaseUser);
        req.user = firebaseUser;
        next();
    }catch(err) {
        res.status(401).json({
            err : 'Token invalido o expirado'
        })
    }
    next();
};

