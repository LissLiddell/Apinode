const jwt = require('jsonwebtoken')
config = require('../config')
const error = require('../middleware/errors')

const secret = config.jwt.secret

function assignToken(data){
    return jwt.sign(data, secret)
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

const checkToken = {
    confirmToken: function(req, id){
        const decodified = decodifiedHeader(req)

        if(decodified.id !== id){
           throw error("you do not have privileges to perform that action", 401) 
        }
    }
}

function getToken(authorization){
    if(!authorization){
       throw error('token doesn´t come', 401) 
    }

    if(authorization.indexOf('Bearer') === -1){
        throw error('Invalid format', 401)
    }

    let token = authorization.replace('Bearer', '')
    return token
}

function decodifiedHeader(req){
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decodified = verifyToken(token)

    req.user = decodified

    return decodified
} 

module.exports = {
    assignToken,
    checkToken
}