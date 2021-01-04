import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import Button from './components/Button'
import nameService from './services/names'

/** Problems:
 *    Filtered names aren't shown unless you first press a sort button
 *    getAmount doesn't work
 *    ---> everyone-button renders total amount only if first sorted
 *    todo: jos esim filtterinä on vaan V, niin tulos on suoraan amount XDD ei hyvä...
 *    todo: kun nappia painetaan, tyhjennetään input sisältö? 
 */

const App = () => {
  const [allNames, setAllNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  //uh oisko joku muu nimi ööhm. nää on filtered or sorted .--.
  //namesList? ööhhmm
  const [shownNames, setShownNames] = useState([])

  //haluunko tän kuitenkin vaa laskea aina getAmountilla tjsp :--D
  //totalVisible vai showTotal vaaai
  //tää on nyt kovin pitkä
  const [totalAmountVisible, setTotalAmountVisible] = useState(false)

  useEffect(() => {
    const getNames = async () => {
      const namesJSON = await nameService.getAll()
      setAllNames(namesJSON)
    }
    getNames()
  }, [])

  useEffect(() => {
    filterList(allNames)
  }, [newFilter, allNames])


  //kinda duplicatey, but makes the code more readable
  const sortByPopularity = () => {
    setTotalAmountVisible(false)
    //slice to make a new array / deep copy
    const sorted = allNames.slice().sort((a, b) => b.amount - a.amount)
    setShownNames(sorted)
  }

  const sortAlphabet = () => {
    setTotalAmountVisible(false)
    const sorted = allNames.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    setShownNames(sorted)
  }

  //jostain syystä kun laitoin totalAmount(list) niin se clogas tän
  //myös muista napeista .__.
  // => Dento selitti: se kutsuttiin joka renderöinnillä kai?
  const totalAmount = (list) => {
    return list.reduce((sum, a) => sum + a.amount, 0)
  }

  //pff onks ihan hölmöä jos nää on vaan yksi funktio e____e ööhm..
  //no sen voi pilkkoo sit
  //tätä pitää kyl kans hioo, ainakin ton booleanhässäkän kaa.
  const getAmount = (obj) => {
    console.log('getAmount obj:', obj)
    console.log('getAmount obj.len:', obj.length)

    //if obj has amount field, it's probably just one obj
    if (obj.amount) {
      return obj.amount
    }
    //otherwise it should be a list of names, return total amount
    if (obj.length > 0) {
      //return obj.reduce((sum, a) => sum + a.amount, 0)
      const total = obj.reduce((sum, a) => sum + a.amount, 0)
      console.log('total', total)
      return total
    }
    console.log('RIP getAmount... obj:', obj)
  }

  const filterList = (list) => {
    //haluunks tarkistaa täällä jo newFilterin pituuden..??
    setTotalAmountVisible(false)
    const filtered = list
      .filter(o => o.name
        .trim()
        .toUpperCase()
        .startsWith(newFilter)
      )
    console.log('filterList, filtered: ', filtered, typeof filtered)

    if (newFilter.length === 0 || filtered.size === 0) {
      setShownNames('')
      console.log('filter and show are empty')
      return
    }

    setShownNames(filtered)

    if (filtered.length === 1) {
      setTotalAmountVisible(true)
    }
  }

  const formNameList = (list) => {
    return (
      <div>
        <b>Names:</b>
        {list.map(n => <div key={n.name}> <Name obj={n} /> </div>)}
      </div>
    )
  }

  const showResults = () => {
    return (
      <div>
        <br />
        {(shownNames.length > 1) ? formNameList(shownNames)
          : (shownNames.length === 1) ? <div> There are {getAmount(shownNames)} {shownNames[0].name}s in Solita </div> /*<div> Amount of {show[0].name}s is {show[0].amount}</div>**/
            : (totalAmountVisible) ? <div> total amount: {totalAmount(allNames)} </div>
              : <div> nothing here :) interact to see data  </div>}
      </div>
    )
  }

  const sshowResults = () => {
    if (shownNames.length > 1) {
      return formNameList(shownNames)
    }

    if (shownNames.length === 1) {
      return (
        <div> There are {getAmount(shownNames)} {shownNames[0].name}s in Solita </div>
      )
    }

    if (totalAmountVisible) {
      return (
        <div> total amount: {totalAmount(allNames)} </div>
      )
    }

    return (
      <div> nothing here :) interact to see data  </div>
    )
  }

  const handleTotalVisibility = () => {
    setShownNames([])
    setTotalAmountVisible(true)
  }

  return (
    <div>
      <h3>Solita Name App</h3>
      <div>
        <button onClick={handleTotalVisibility}>Total amount</button>
      </div>
      <div>
        Sort by...
        <button onClick={sortByPopularity}>Popularity</button>
        <button onClick={sortAlphabet}>Alphabet</button>
      </div>
      <Filter setNewFilter={setNewFilter} />
      {showResults()}
      {sshowResults()}
    </div>
  )
}

export default App