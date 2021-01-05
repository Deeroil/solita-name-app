const namesRouter = require('express').Router()
const names = require('../names.json')['names']

namesRouter.get('/', (req, res) => {
  res.json(names)
})

namesRouter.get('/:name', (req, res) => {
  const found = names.find(o => o.name.toLowerCase() === req.params.name.toLowerCase())

  if (found) {
    res.json(found)
  } else {
    res.send(404).end()
  }
})

module.exports = namesRouter