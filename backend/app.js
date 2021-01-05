const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
const namesRouter = require('./controllers/names')

app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use(cors())
app.use(express.json())
app.use('/api/names', namesRouter)

module.exports = app