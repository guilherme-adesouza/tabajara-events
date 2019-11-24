const jwt = require('jsonwebtoken');

const secretKey = 'lansando_a_braba';
const jwt_name = 'cesar_session';

function decodeRequestToken(req){
    const token = req.cookies[jwt_name];
    return !!token ? decodeJWT(token) : {user: null};
}

function generateJWT(user, creationTime = null){
    const expires = Date.now() + (30 * 1000 * 60);
    if(!creationTime) {
        creationTime = expires;
    }
    return jwt.sign(JSON.stringify({user, expires, creationTime}), secretKey);
}

function decodeJWT(token){
    return jwt.verify(token, secretKey);
}

module.exports = {
    jwt_name,
    decodeRequestToken,
    generateJWT
};