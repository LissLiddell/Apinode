const express = require('express')

const response = require('../../red/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req,res) {
    const all = controller.all()
    .then((items) =>{
         response.success(req, res, items, 200)
     })
})

module.exports = router