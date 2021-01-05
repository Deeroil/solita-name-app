import React, { useState, useEffect } from 'react'
import Namelist from './components/Namelist'
import Filter from './components/Filter'
import Button from './components/Button'
import nameService from './services/names'

/** Problems:
 *    * jos esim filtterinä on vaan V, niin tulos on suoraan amount
 *    * todo: kun nappia painetaan, tyhjennetään input sisältö? 
 */

const App = () => {
  const [allNames, setAllNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  //oisko joku muu nimi? nää on filtered or sorted
  //namesList? ööhhmm
  const [shownNames, setShownNames] = useState([])
  const [totalVisible, setTotalVisible] = useState(false)

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
    setTotalVisible(false)
    //slice to make a new array / deep copy
    const sorted = allNames.slice().sort((a, b) => b.amount - a.amount)
    setShownNames(sorted)
  }

  const sortAlphabet = () => {
    setTotalVisible(false)
    const sorted = allNames.slice().sort((a, b) => (a.name > b.name) ? 1 : -1)
    setShownNames(sorted)
  }

  const totalAmount = () => allNames.reduce((sum, a) => sum + a.amount, 0)

  const filterList = (list) => {
    setTotalVisible(false)

    const filtered = list
      .filter(o => o.name
        .trim()
        .toUpperCase()
        .startsWith(newFilter)
      )

    if (newFilter.length === 0 || filtered.size === 0) {
      setShownNames('')
      return
    }

    setShownNames(filtered)
  }

  const showResults = () => {
    if (shownNames.length > 1) return <Namelist list={shownNames} />

    else if (shownNames.length === 1) return <div> There are {shownNames[0].amount} {shownNames[0].name}s in Solita </div>

    else if (totalVisible) return <div> total amount: {totalAmount()} </div>

    else return <div> nothing here, interact to see data </div>
  }

  const handleTotalVisibility = () => {
    setShownNames([])
    setTotalVisible(true)
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
    </div>
  )
}

export default App