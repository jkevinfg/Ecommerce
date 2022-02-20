require('dotenv').config();

const config = {
    //api
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    database : process.env.DATABASE,
    //firebase
    firebaseType : process.env.FIREBASE_SERVICE_TYPE ,
    firebaseProjectId : process.env.FIREBASE_PROJECT_ID, 
    firebasePrivateKeyId : process.env.FIREBASE_PRIVATE_KEY_ID,
    firebasePrivateKey : process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') ,
     firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebaseClientId: process.env.FIREBASE_CLIENT_ID ,
    firebaseAuthUri: process.env.FIREBASE_AUTH_URI,
    firebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
    firebaseAuthProvider: process.env.FIREBASE_PROVIDER_URL,
    firebaseClientUrl: process.env.FIREBASE_CLIENT_CERT_URL
};

module.exports = { config };