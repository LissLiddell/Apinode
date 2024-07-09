const express = require('express')

const response = require('../../red/response')
const controller = require('./index')

const router = express.Router()

router.post('/login', login)

async function login (req, res, next) {
    try{
        const token = await controller.login(req.body.user, req.body.password)
        res.json({token: token, status: token ? 200 : 500, error: token == null})
        res.json({'token': true})
    }catch(err){
        next(err)
    }
}

module.exports = router