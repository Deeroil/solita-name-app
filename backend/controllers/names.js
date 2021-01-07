const namesRouter = require('express').Router()
const names = require('../names.json')['names']

namesRouter.get('/', (req, res) => {
  res.json(names)
})

//up here so it doesn't get mixed up with /:name
namesRouter.get('/total', (req, res) => {
  const total = names.map(n => n.amount).reduce((a, sum) => a + sum, 0)
  res.json(total)
})

namesRouter.get('/:name', (req, res) => {
  const found = names.find(o => o.name.toLowerCase() === req.params.name.toLowerCase())

  if (found) {
    res.json(found)
  } else {
    res.sendStatus(404).end()
  }
})

namesRouter.get('/:name/amount', (req, res) => {
  const found = names.find(o => o.name.toLowerCase() === req.params.name.toLowerCase())

  if (found) {
    res.json({ amount: found.amount })
  } else {
    res.sendStatus(404).end()
  }
})

namesRouter.get('/sort/alphabet', (req, res) => {
  const alphSorted = names.map(n => { return { name: n.name } }).sort((a, b) => a.name > b.name ? 1 : -1)
  res.json(alphSorted)
})

namesRouter.get('/sort/popular', (req, res) => {
  const popSorted = names.slice().sort((a, b) => b.amount - a.amount)
  res.json(popSorted)
})

module.exports = namesRouter