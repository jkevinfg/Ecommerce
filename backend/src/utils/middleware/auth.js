const admin = require('../firebase');

 async function authCheck(req,res,next) {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
        req.user = firebaseUser;
        next();
    }catch(err) {
        return res.status(401).json({
            err : 'Token invalido o expirado'
        })
    }
};
module.exports = authCheck;
