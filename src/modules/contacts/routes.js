const express = require('express')

const response = require('../../red/response')
const controller = require('./controller')

const router = express.Router()

router.get('/', function (req,res) {
    const all = controller.all()
    response.success(req, res, all, 200)
})

module.exports = router