const express = require('express')
const sql = require('mssql');
const response = require('../../red/response')
const controller = require('./index')

const router = express.Router()

router.post('/', add)
router.get('/', all)
router.get('/:id', one)
router.put('/', del)

async function add (req,res, next) {
    try{
        let message = ''
        const add = await controller.add(req.body)
        console.log(add)
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
        const del = await controller.del(req.body.id)
        if(del.affectedRows > 0)
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