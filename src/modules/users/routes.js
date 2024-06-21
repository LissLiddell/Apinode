const express = require('express')

const controller = require('./index')
const response = require('../../red/response')
const security = require('./security')


const router = express.Router()

router.post('/', add, security())
router.get('/', all)
router.put('/', del, security())
router.get('/:id', one)

async function add (req,res, next) {
    try{
        const all = await controller.add(req.body)
        if(req.body.id == 0){
            message = 'User Saved'
        }else{
            message = 'User modified successfully'
        }
        response.success(req, res, message, 201)
    }catch(err){
        next(err)
    }
}

 async function all (req, res, next) {
    try{
        const all = await controller.all()
        response.success(req, res, all, 200)
    }catch(err){
        next(err)
    }
}

async function del (req,res, next) {
    try{
        const all = await controller.del(req.body)
        response.success(req, res, 'User deleted successfully', 200)
    }catch(err){
        next(err)
    }
}

 async function one (req, res, next) {
    try{
        const all = await controller.one(req.params.id)
        response.success(req, res, all, 200)
    }catch(err){
        next(err)
    }
}

module.exports = router