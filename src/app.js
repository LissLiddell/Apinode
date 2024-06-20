const express = require('express')
const config = require('./config')
const morgan = require('morgan')

const contacts = require('./modules/contacts/routes')
const error = require('./red/errors')

const app = express()

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Conf
app.set('port', config.app.port)

//Routes
app.use('/api/contacts', contacts)
app.use(error)

module.exports = app