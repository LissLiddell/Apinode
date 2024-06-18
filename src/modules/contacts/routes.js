const express = require('express')

const response = require('../../red/response')

const router = express.Router()

router.get('/', function (req,res) {
    response.success(req, res, 'All OK by contacs', 200)
})

module.exports = router