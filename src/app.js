const express = require('express')
const config = require('./config')

const contacts = require('./modules/contacts/routes')

const app = express()

//Conf
app.set('port', config.app.port)

//Routes
app.use('/api/contacts', contacts)

module.exports = app