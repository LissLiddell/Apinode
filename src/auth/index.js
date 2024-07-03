const jwt = require('jsonwebtoken')
config = require('../config')
const error = require('../middleware/errors')

const secret = config.jwt.secret

function assignToken(data){
    return jwt.sign(data, secret)
}

const checkToken = {
    confirmToken: function(req, id){
        const decodified = decodifiedHeader(req)

        if(decodified.id !== id){
            throw new Error("Do not have permission")
        }
    }
}

function decodifiedHeader(req){
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decodified = verifyToken(token)

    req.user = decodified

    return decodified
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

function verifyToken(token){
    return jwt.verify(token, secret)
}

module.exports = {
    assignToken,
    checkToken
}