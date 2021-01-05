import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Namelist from './components/Namelist'
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
  //oisko joku muu nimi? nää on filtered or sorted
  //namesList? ööhhmm
  const [shownNames, setShownNames] = useState([])

  //haluunko tän kuitenkin vaa laskea aina getAmountilla?
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

  const totalAmount = () => allNames.reduce((sum, a) => sum + a.amount, 0)

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

  const showResults = () => {
    return (
      <div>
        <br />
        {(shownNames.length > 1) ? <Namelist list={shownNames} />
          : (shownNames.length === 1) ? <div> There are {shownNames[0].amount} {shownNames[0].name}s in Solita </div> /*<div> Amount of {show[0].name}s is {show[0].amount}</div>**/
            : (totalAmountVisible) ? <div> total amount: {totalAmount()} </div>
              : <div> nothing here :) interact to see data  </div>}
      </div>
    )
  }

  const sshowResults = () => {
    if (shownNames.length > 1) {
      return <Namelist list={shownNames} />
    }

    if (shownNames.length === 1) {
      return (
        <div> There are {shownNames[0].amount} {shownNames[0].name}s in Solita </div>
      )
    }

    if (totalAmountVisible) {
      return (
        <div> total amount: {totalAmount()} </div>
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
        Sort by...
        <Button onClick={sortByPopularity} label={'Popular'} />
        <Button onClick={sortAlphabet} label={'Alphabet'} />
      </div>
      Show...
      <Button onClick={handleTotalVisibility} label={'Total amount'} />
      <Filter setNewFilter={setNewFilter} />
      {showResults()}
      {sshowResults()}
    </div>
  )
}

export default App