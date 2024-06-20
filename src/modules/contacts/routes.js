const express = require('express')

const response = require('../../red/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', all)
router.get('/:id', one)
router.post('/', add)
router.put('/', del)

 async function all (req, res, next) {
    try{
        const all = await controller.all()
        response.success(req, res, all, 200)
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

async function add (req,res, next) {
    try{
        const all = await controller.add(req.body)
        if(req.body.id == 0){
            message = 'Contact Saved'
        }else{
            message = 'Contact modified successfully'
        }
        response.success(req, res, message, 201)
    }catch(err){
        next(err)
    }
}

async function del (req,res, next) {
    try{
        const all = await controller.del(req.body)
        response.success(req, res, 'Item eliminado satisfactoriamente', 200)
    }catch(err){
        next(err)
    }
}

module.exports = router