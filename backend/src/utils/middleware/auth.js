const admin = require('../firebase');


exports.authCheck = (req,res,next) => {
    console.log(req.headers); //token
    try {
        const firebaseUser = admin.auth().verifyIdToken(req.headers.authtoken)
        console.log(req.headers.authtoken)
    }catch(err) {
        console.log(err)
        res.status(401).json({
            err : 'Token invalido o expirado'
        })
    }
    next();
};

