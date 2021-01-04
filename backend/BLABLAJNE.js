const namesJSON = require('./names.json')

/**
 * TODO: kun sen nimen voi syöttää, haluun hakee sen .toLowerCase tjsp
 *... ja poistaa whitespacet 
 */


console.log('namesJSON', namesJSON)
console.log('namesJSON.names', namesJSON.names)
//const names = namesJSON.names.map(n => n.name)

const objPairs = namesJSON.names
//console.log('objPairs', objPairs)

//desc sort: 24 => 22 => 19....
console.log('sort pairs desc amount:', objPairs.sort((a, b) => b.amount - a.amount))

//ei tarvi miettiä case sensitiivisyyttä, koska mmmm...
//nimet on kirjoitettu AINAKIN TOISTAISEKSI vain yhdessä muodossa.
//ei tarvita nollaa, koska samoja nimiä ei ole kahdesti lol
console.log('sort pairs alph:', objPairs.sort((a, b) => a.name > b.name ? 1 : -1))

//oho ainiin ne halusi pelkät nimet
console.log('sorted names:',objPairs.map(n => n.name).sort((a, b) => a > b ? 1 : -1))

const amounts = objPairs.map(o => o.amount)
const totalAmount = amounts.reduce((a, sum) => a + sum, 0)
console.log('totalAmount', totalAmount)

//en tykkää tosta nollasta tuolla hjkfdhd ku filter tunkee sen arrayhyn
const getAmount = name => objPairs.filter(o => o.name == name)[0].amount

console.log('Ville amount:', getAmount('Ville'))