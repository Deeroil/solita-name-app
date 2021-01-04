const namesRouter = require('express').Router()
const names = require('../names.json')['names']
//haluun salee käsitellä ton kivemmaksi e__e mut onks tää oikee paikka...
//musta tuntuu että se json-server teki tosta ekasta names sen /names ja näytti vasta sen jlk?? HMMM!!??

/**
 * OK onks se aivan hirveetä että haen nää kaikki asiat joka kerta tosta JSON-filusta ::DD HMMMM
 */

//haluunks async awaittia tänne? hm. Nääh en salee tarvii
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