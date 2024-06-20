const express = require('express')

const response = require('../../red/response')
const controller = require('./index')

const router = express.Router()

router.post('/', add)
router.get('/', all)
router.put('/', del)
router.get('/:id', one)

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
        response.success(req, res, 'Contact deleted successfully', 200)
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