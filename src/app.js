const express = require('express')
const config = require('./config')
const morgan = require('morgan')
var cors = require('cors')

const contacts = require('./modules/contacts/routes')
const users = require('./modules/users/routes')
const auth = require('./modules/auth/routes')
const error = require('./red/errors')

const app = express()
const port = 3000;

//Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Conf
app.set('port', port)

//Routes
app.use(cors())
app.use('/api/contacts', contacts)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(error)

module.exports = app