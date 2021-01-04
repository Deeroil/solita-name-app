const express = require('express')
const app = express()
const cors = require('cors')
const namesRouter = require('./controllers/names')

//muista cors!
app.use(cors())
app.use(express.json())
app.use('/api/names', namesRouter)

module.exports = app