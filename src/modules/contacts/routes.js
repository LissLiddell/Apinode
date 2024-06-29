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
        const add = await controller.add(req.body)
        if(req.body.id == 0){
            message = 'Contact Saved'
        }else{
            message = 'Contact modified successfully'
        }
        res.json({contacts: add, message,  status: 201})
    }catch(err){
        next(err)
    }
}

 async function all (req, res, next) {
    try{
        const all = await controller.all()
        res.json({contacts: all, status: 200})
    }catch(err){
        next(err)
    }
}

async function del (req,res, next) {
    try{
        console.log('respuesta del body', req.body.data.id, req.body.data)
        const del = await controller.del(req.body.data)
        if(del.affectedRowsn > 0)
            res.json({ message: 'Contact deleted successfully', status: 200 })
        else
            res.json({ message: 'Deleted failed', status: 500 })
    }catch(err){
        next(err)
    }
}

 async function one (req, res, next) {
    try{
        const one = await controller.one(req.params.id)
        res.json({contacts: one, status: 200})
    }catch(err){
        next(err)
    }
}


module.exports = router