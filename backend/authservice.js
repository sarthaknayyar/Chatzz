const jwt = require('jsonwebtoken');
const secretkey = "sarthak";

function setUser(user){
    const token = jwt.sign({user},secretkey, {expiresIn: '2h'});
    return token;
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secretkey);
}

module.exports = {setUser,getUser};